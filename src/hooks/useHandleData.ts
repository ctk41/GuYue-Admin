import { ExclamationCircleOutlined } from '@ant-design/icons-vue';
import { createVNode } from 'vue';
import { Modal, message } from 'ant-design-vue';

/**
 * @description Handle single data item with confirmation -> delete, disable, enable, reset password
 * @param {Function} api API method for the data operation -> required
 * @param {Object} params Parameters for the operation {id,params} -> required
 * @param {String} msg Prompt message -> required
 * @returns {Promise}
 */
export const useHandleData = (api: (params: any) => Promise<any>, params: any = {}, msg: string) => {
  return new Promise((resolve, reject) => {
    Modal.confirm({
      title: 'Friendly Reminder',
      icon: createVNode(ExclamationCircleOutlined),
      content: `Do you want to ${msg}?`,
      onOk: async () => {
        const res = await api(params);
        if (!res) return reject(false);
        message.success(`${msg} successful!`);
        resolve(true);
      },
      onCancel() {},
    });
  });
};
