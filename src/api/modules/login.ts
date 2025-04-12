import { Login } from '@/api/interface/index';
import http from '@/api';

export const loginApi = (params: Login.ReqLoginForm) => {
  return http.post<Login.ResLogin>(`/login`, params, { noLoading: true });
};

export const getAuthButtonListApi = () => {
  return http.get<Login.ResAuthButtons>(`/auth/buttons`, {}, { noLoading: true });
};

export const logoutApi = () => {
  return http.post(`/logout`);
};
