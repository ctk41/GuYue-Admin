import { Login } from '@/api/interface/index';
import { PORT } from '@/api/config/servicePort';
import http from '@/api';

export const loginApi = (params: Login.ReqLoginForm) => {
  return http.post<Login.ResLogin>(PORT + `/login`, params, { noLoading: true });
};

export const getAuthButtonListApi = () => {
  return http.get<Login.ResAuthButtons>(PORT + `/auth/buttons`, {}, { noLoading: true });
};

export const logoutApi = () => {
  return http.post(PORT + `/logout`);
};
