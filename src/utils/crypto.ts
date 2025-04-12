import AES from 'crypto-js/aes';
import CORE from 'crypto-js/core';
import MD5 from 'crypto-js/md5';
import { isObject, isString } from './is';

const SECRET_KEY = 'GuYue1314520';
const encryption = (word: any): string => {
  const key = CORE.enc.Utf8.parse(SECRET_KEY);
  const iv = key;
  let enc: any = '';
  if (isString(word)) {
    enc = AES.encrypt(word, key, {
      iv,
      mode: CORE.mode.CBC,
      padding: CORE.pad.Pkcs7,
    });
  } else if (isObject(word)) {
    let data = JSON.stringify(word);
    enc = AES.encrypt(data, key, {
      iv,
      mode: CORE.mode.CBC,
      padding: CORE.pad.Pkcs7,
    });
  }
  let encResult = enc.toString();
  return encResult;
};
const decryption = (word: any): string => {
  const key = CORE.enc.Utf8.parse(SECRET_KEY);
  const iv = key;
  let dec = AES.decrypt(word, key, {
    iv,
    mode: CORE.mode.CBC,
    padding: CORE.pad.Pkcs7,
  });
  let decData = dec.toString(CORE.enc.Utf8);
  return decData;
};

function md5Encryption(word: string) {
  return MD5(word).toString();
}

export { decryption, encryption, md5Encryption };
