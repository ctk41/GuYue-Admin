import { defineStore } from 'pinia';
import { AuthState } from '@/stores/interface';
import { getAuthButtonListApi, getAuthMenuListApi } from '@/api/modules/login';
import { getFlatArr, getShowMenuList, getAllBreadcrumbList } from '@/utils/util';

// useAuthStore
export const useAuthStore = defineStore({
  id: 'guyue-auth',
  state: (): AuthState => ({
    routeName: '',
    authMenuList: [],
    authButtonList: {},
  }),
  getters: {
    authButtonListGet: state => state.authButtonList,
    authMenuListGet: state => state.authMenuList,
    flatMenuListGet: state => getFlatArr(state.authMenuList),
    showMenuListGet: state => getShowMenuList(state.authMenuList),
    breadcrumbListGet: state => getAllBreadcrumbList(state.authMenuList),
  },
  actions: {
    async getAuthButtonList() {
      const { data } = await getAuthButtonListApi();
      this.authButtonList = data;
    },
    async getAuthMenuList() {
      const { data } = await getAuthMenuListApi();
      this.authMenuList = data;
    },
    async setRouteName(name: string) {
      this.routeName = name;
    },
  },
});
