import { MockMethod } from 'vite-plugin-mock';

export default [
  {
    url: '/api/auth/buttons',
    method: 'get',
    response: () => {
      return {
        code: 200,
        msg: '成功',
        data: {
          authButton: ['add', 'edit', 'delete', 'import', 'export'],
          useProTable: ['add', 'batchAdd', 'export', 'batchDelete', 'status'],
        },
      };
    },
  },
  {
    url: '/api/login',
    method: 'post',
    response: () => {
      return {
        code: 200,
        data: {
          access_token: 'bqddxxwqmfncffacvbpkuxvwvqrhln',
        },
        msg: '成功',
      };
    },
  },
  {
    url: '/api/logout',
    method: 'post',
    response: () => {
      return {
        code: 200,
        msg: '退出登录成功',
      };
    },
  },
] as MockMethod[];
