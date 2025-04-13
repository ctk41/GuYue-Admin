import { isObject, isNullOrUnDef } from '../is';
import dayjs from 'dayjs';
import type { Cache } from './type';
import { StorageType } from '@/enums/cache';
import { decryption, encryption } from '../crypto';

const lsMap = new Map();
const ssMap = new Map();
class WebStorage {
  private storage: Storage;
  private hasEncrypt: boolean;
  private KEY: string;
  private expire: null | number;

  constructor({
    storage = sessionStorage,
    hasEncrypt = true,
    key = '',
    expire,
  }: {
    storage?: Storage;
    hasEncrypt?: boolean;
    key?: string;
    expire?: number | null;
  }) {
    this.storage = storage;
    this.hasEncrypt = hasEncrypt;
    this.KEY = key;
    this.expire = expire || null;
  }

  get(key?: any) {
    const val = this.storage.getItem(this.KEY);
    if (!val) return null;
    const desVal = this.hasEncrypt ? decryption(val) : val;
    const data = JSON.parse(desVal);
    const { value, expire } = data;
    if (isNullOrUnDef(expire) || expire >= dayjs().valueOf()) {
      if (isObject(value) && !isNullOrUnDef(key)) return value[`cacheKey-${key}`];
      else return value;
    }
    this.remove();
  }

  set(value: string | number | object | [] | null, objectKey?: any) {
    let cacheValue;
    if (!isNullOrUnDef(objectKey)) {
      const tempCache = isObject(this.get()) ? this.get() : {};
      tempCache[`cacheKey-${objectKey}`] = value;
      cacheValue = tempCache;
    } else {
      cacheValue = value;
    }
    const data = JSON.stringify({
      value: cacheValue,
      expire: !isNullOrUnDef(this.expire) ? dayjs().valueOf() + this.expire * 1000 : null,
    });
    const encData = this.hasEncrypt ? encryption(data) : data;
    this.storage.setItem(this.KEY, encData);
  }

  remove() {
    this.storage.removeItem(this.KEY);
  }
}

export function createCacheStorage(cacheConfig: Cache): WebStorage {
  if (cacheConfig.type === StorageType.LOCAL) {
    return createLocalStorage(cacheConfig);
  } else if (cacheConfig.type === StorageType.SESSION) {
    return createSessionStorage(cacheConfig);
  } else {
    throw new Error('Invalid storage type');
  }
}

const createLocalStorage = ({ hasEncrypt = true, key, expire = null }: Cache): WebStorage => {
  if (!key) throw new Error('please enter the Key');

  if (lsMap.get(key)) return lsMap.get(key)!;
  else {
    const newLs = new WebStorage({
      storage: localStorage,
      hasEncrypt,
      key,
      expire,
    });
    lsMap.set(key, newLs);
    return newLs;
  }
};

const createSessionStorage = ({ hasEncrypt = true, key, expire = null }: Cache): WebStorage => {
  if (!key) throw new Error('please enter the Key');

  if (ssMap.get(key)) return ssMap.get(key)!;
  else {
    const newSs = new WebStorage({
      storage: sessionStorage,
      hasEncrypt,
      key,
      expire,
    });
    ssMap.set(key, newSs);
    return newSs;
  }
};

export const clearAllLocalStorage = () => {
  window.localStorage.clear();
  lsMap.clear();
};

export const clearAllSessionStorage = () => {
  window.sessionStorage.clear();
  ssMap.clear();
};

export const clearStorage = () => {
  clearAllLocalStorage();
  clearAllSessionStorage();
};
