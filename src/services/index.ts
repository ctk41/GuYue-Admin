import axios from 'axios';
import type { AxiosInstance, AxiosError, AxiosRequestConfig, InternalAxiosRequestConfig, AxiosResponse } from 'axios';
import { message } from 'ant-design-vue';
import { ResultData } from '@/services/interface';
import { ResultEnum } from '@/enums/httpEnum';
import { checkStatus } from './helper/checkStatus';
import { useGlobalStore } from '@/stores/modules/global';
import { LOGIN_URL } from '@/config';
import { useUserStore } from '@/stores/modules/user';
import router from '@/routers';

export interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
  noLoading?: boolean;
}

const config = {
  baseURL: import.meta.env.VITE_API_BACKEND_URL as string,
  timeout: ResultEnum.TIMEOUT as number,
  withCredentials: true,
};

class RequestHttp {
  service: AxiosInstance;
  public constructor(config: AxiosRequestConfig) {
    this.service = axios.create(config);

    this.service.interceptors.request.use(
      (config: CustomAxiosRequestConfig) => {
        const globalState = useGlobalStore();
        const userStore = useUserStore();
        config.noLoading || globalState.setGlobalState('loading', true);
        if (config.headers && typeof config.headers.set === 'function') {
          config.headers.set('x-access-token', userStore.token);
        }
        return config;
      },
      (error: AxiosError) => {
        return Promise.reject(error);
      },
    );

    this.service.interceptors.response.use(
      (response: AxiosResponse) => {
        const { data } = response;
        const globalState = useGlobalStore();
        const userStore = useUserStore();
        globalState.setGlobalState('loading', false);
        if (data.code == ResultEnum.OVERDUE) {
          message.error(data.msg);
          userStore.setToken('');
          router.replace(LOGIN_URL);
          return Promise.reject(data);
        }
        if (data.code && data.code !== ResultEnum.SUCCESS) {
          message.error(data.msg);
          return Promise.reject(data);
        }
        return data;
      },
      async (error: AxiosError) => {
        const { response } = error;
        const globalState = useGlobalStore();
        globalState.setGlobalState('loading', false);
        if (error.message.indexOf('timeout') !== -1) message.error('请求超时！请您稍后重试');
        if (error.message.indexOf('Network Error') !== -1) message.error('网络错误！请您稍后重试');
        if (response) checkStatus(response.status);
        if (!window.navigator.onLine) {
        }
        return Promise.reject(error);
      },
    );
  }

  get<T>(url: string, params?: object, _object = {}): Promise<ResultData<T>> {
    return this.service.get(url, { params, ..._object });
  }
  post<T>(url: string, params?: object, _object = {}): Promise<ResultData<T>> {
    return this.service.post(url, params, _object);
  }
  put<T>(url: string, params?: object, _object = {}): Promise<ResultData<T>> {
    return this.service.put(url, params, _object);
  }
  delete<T>(url: string, params?: any, _object = {}): Promise<ResultData<T>> {
    return this.service.delete(url, { params, ..._object });
  }
  download(url: string, params?: object, _object = {}): Promise<BlobPart> {
    return this.service.post(url, params, { ..._object, responseType: 'blob' });
  }
}

export default new RequestHttp(config);
