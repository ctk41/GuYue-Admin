import { defineStore } from 'pinia';
import { GlobalState } from '@/stores/interface';
import { DEFAULT_PRIMARY } from '@/config';
import piniaPersistConfig from '@/config/piniaPersist';

export const useGlobalStore = defineStore({
  id: 'app-global',
  state: (): GlobalState => ({
    refreshPage: true,
    routeName: '',
    loading: false,
    layout: 'vertical',
    assemblySize: 'middle',
    language: 'zh_CN',
    maximize: false,
    primary: DEFAULT_PRIMARY,
    styleSetting: 'dark',
    isGrey: false,
    isWeak: false,
    isCollapse: false,
    breadcrumb: true,
    breadcrumbIcon: true,
    tabs: true,
    tabsIcon: true,
    footer: true,
  }),
  getters: {},
  actions: {
    setGlobalState(key: keyof GlobalState, val: any) {
      this.$patch({ [key]: val });
    },
  },
  persist: piniaPersistConfig('app-global'),
});
