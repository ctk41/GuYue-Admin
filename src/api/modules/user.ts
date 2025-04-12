import { ResPage, User } from '@/api/interface/index';
import { PORT } from '@/api/config/servicePort';
import http from '@/api';

export const getUserList = (params: User.ReqUserParams) => {
  return http.post<ResPage<User.ResUserList>>(PORT + `/user/list`, params);
};

export const BatchAddUser = (params: FormData) => {
  return http.post(PORT + `/user/import`, params);
};

export const exportUserInfo = (params: User.ReqUserParams) => {
  return http.download(PORT + `/user/export`, params);
};

export const resetUserPassWord = (params: { id: string }) => {
  return http.post(PORT + `/user/rest_password`, params);
};

export const deleteUser = (params: { id: string[] }) => {
  return http.post(PORT + `/user/delete`, params);
};

export const changeUserStatus = (params: { id: string; status: number }) => {
  return http.post(PORT + `/user/change`, params);
};
