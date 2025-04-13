import { Role } from '@/services/interface/index';
import http from '@/services';

export const getRolesListApi = () => {
  return http.get<Role.RoleList[]>(`/basicRole/list`);
};
