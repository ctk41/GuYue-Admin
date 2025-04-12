import { Role } from '@/api/interface/index';
import { PORT } from '@/api/config/servicePort';
import http from '@/api';

export const getRolesListApi = () => {
  return http.get<Role.RoleList[]>(PORT + `/basicRole/list`);
};
