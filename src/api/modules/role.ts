import { Role } from '@/api/interface/index';
import http from '@/api';

export const getRolesListApi = () => {
  return http.get<Role.RoleList[]>(`/basicRole/list`);
};
