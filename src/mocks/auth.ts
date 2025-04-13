import { MockMethod } from 'vite-plugin-mock';

export default [
  {
    url: '/api/auth/buttons',
    method: 'get',
    response: () => {
      return {
        code: 200,
        msg: 'success',
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
        msg: 'success',
      };
    },
  },
  {
    url: '/api/logout',
    method: 'post',
    response: () => {
      return {
        code: 200,
        msg: 'success',
      };
    },
  },
] as MockMethod[];
