import { defineStore } from 'pinia';
import { AuthState } from '@/stores/interface';
import { getAuthButtonListApi } from '@/api/modules/login';
import { getFlatArr, getShowMenuList, getAllBreadcrumbList } from '@/utils/util';
import { staticMenu } from '@/routers/modules/staticMenu';

// useAuthStore
export const useAuthStore = defineStore({
  id: 'app-auth',
  state: (): AuthState => ({
    routeName: '',
    authButtonList: {},
  }),
  getters: {
    authButtonListGet: state => state.authButtonList,
    authMenuListGet: () => staticMenu,
    flatMenuListGet: () => getFlatArr(staticMenu),
    showMenuListGet: () => getShowMenuList(staticMenu),
    breadcrumbListGet: () => getAllBreadcrumbList(staticMenu),
  },
  actions: {
    async getAuthButtonList() {
      const { data } = await getAuthButtonListApi();
      this.authButtonList = data;
    },
    async setRouteName(name: string) {
      this.routeName = name;
    },
  },
});
