import { defineStore } from 'pinia';
import { UserState } from '@/stores/interface';
import piniaPersistConfig from '@/config/piniaPersist';

export const useUserStore = defineStore({
  id: 'app-user',
  state: (): UserState => ({
    token: '',
    userInfo: { name: 'admin' },
  }),
  getters: {},
  actions: {
    setToken(token: string) {
      this.token = token;
    },
    setUserInfo(userInfo: UserState['userInfo']) {
      this.userInfo = userInfo;
    },
  },
  persist: piniaPersistConfig('app-user'),
});
