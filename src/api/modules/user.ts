import { ResPage, User } from '@/api/interface/index';
import http from '@/api';

export const getUserList = (params: User.ReqUserParams) => {
  return http.post<ResPage<User.ResUserList>>(`/user/list`, params);
};

export const BatchAddUser = (params: FormData) => {
  return http.post(`/user/import`, params);
};

export const exportUserInfo = (params: User.ReqUserParams) => {
  return http.download(`/user/export`, params);
};

export const resetUserPassWord = (params: { id: string }) => {
  return http.post(`/user/rest_password`, params);
};

export const deleteUser = (params: { id: string[] }) => {
  return http.post(`/user/delete`, params);
};

export const changeUserStatus = (params: { id: string; status: number }) => {
  return http.post(`/user/change`, params);
};
