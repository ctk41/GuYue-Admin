import router from '@/routers/index';
import { isType } from '@/utils/util';
import { LOGIN_URL } from '@/config';
import { notification } from 'ant-design-vue';
import { useUserStore } from '@/stores/modules/user';
import { useAuthStore } from '@/stores/modules/auth';

const module = import.meta.glob('@/views/**/*.vue');

export const initDynamicRouter = async () => {
  const authStore = useAuthStore();
  const userStore = useUserStore();

  try {
    await authStore.getAuthMenuList();
    await authStore.getAuthButtonList();

    if (!authStore.authMenuListGet.length) {
      notification['warning']({
        message: '无权限访问',
        description: '当前账号无任何菜单权限，请联系系统管理员！',
        duration: 3,
      });
      userStore.setToken('');
      router.replace(LOGIN_URL);
      return Promise.reject('No permission');
    }

    authStore.flatMenuListGet.forEach((item: any) => {
      item.children && delete item.children;
      if (item.component && isType(item.component) == 'string') {
        item.component = module['/src/views' + item.component + '.vue'];
      }
      if (item.meta.isFull) {
        router.addRoute(item);
      } else {
        router.addRoute('layout', item);
      }
    });
  } catch (error) {
    userStore.setToken('');
    router.replace(LOGIN_URL);
    return Promise.reject(error);
  }
};
