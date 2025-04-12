import { MockMethod } from 'vite-plugin-mock';

export default [
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
    url: '/api/user/list',
    method: 'get',
    response: () => {
      return {
        code: 200,
        msg: '成功',
        data: {
          list: [
            {
              id: '411532457632457572',
              username: '万磊',
              rolename: '客户',
              gender: 1,
              user: {
                detail: {
                  age: 17,
                },
              },
              idCard: '411532457632457572',
              email: 'o.tqmt@nnxojseh.ye',
              address: '云南省 普洱市',
              createTime: '2006-10-17 11:43:10',
              status: 0,
              avatar: [
                'https://i.imgtg.com/2023/01/16/QRBHS.jpg',
                'https://i.imgtg.com/2023/01/16/QRqMK.jpg',
                'https://i.imgtg.com/2023/01/16/QR57a.jpg',
                'https://i.imgtg.com/2023/01/16/QRa0s.jpg',
              ],
              introduction:
                'https://prod-streaming-video-msn-com.akamaized.net/da8b8a96-5a73-4a17-8ed8-960b8cd5afb1/30223688-167c-48a2-aa96-9764378a92d4.mp4',
            },
          ],
          pageNum: 1,
          pageSize: 25,
          total: 2000,
        },
      };
    },
  },
] as MockMethod[];
