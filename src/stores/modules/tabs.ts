import { defineStore } from 'pinia';
import { TabsState, TabsMenuProps } from '@/stores/interface';
import piniaPersistConfig from '@/config/piniaPersist';
import router from '@/routers/index';

export const useTabsStore = defineStore({
  id: 'app-tabs',
  state: (): TabsState => ({
    tabsMenuList: [],
  }),
  actions: {
    async addTabs(tabItem: TabsMenuProps) {
      if (this.tabsMenuList.every(t => t.path !== tabItem.path)) {
        this.tabsMenuList.push(tabItem);
      }
    },
    async removeTabs(tabPath: string, isCurrent: boolean = true) {
      const tabsMenuList = this.tabsMenuList;
      if (isCurrent) {
        tabsMenuList.forEach((item, index) => {
          if (item.path !== tabPath) return;
          const nextTab = tabsMenuList[index + 1] || tabsMenuList[index - 1];
          if (!nextTab) return;
          router.push(nextTab.path);
        });
      }
      this.tabsMenuList = tabsMenuList.filter(tab => tab.path !== tabPath);
    },
    async closeMultipleTab(tabsMenuValue?: string) {
      this.tabsMenuList = this.tabsMenuList.filter(tab => {
        return tab.path === tabsMenuValue || !tab.close;
      });
    },
    async setTabs(tabsMenuList: TabsMenuProps[]) {
      this.tabsMenuList = tabsMenuList;
    },
    async setTabsTitle(tabsMenuTitle: string) {
      const nowFullPath = location.hash.substring(1);
      this.tabsMenuList.forEach(item => {
        if (item.path == nowFullPath) item.title = tabsMenuTitle;
      });
    },
    async closeLeftTab(tabPath: string) {
      const pathIndex = this.tabsMenuList.findIndex(obj => obj.path === tabPath);
      this.tabsMenuList = this.tabsMenuList.filter((obj, index) => {
        if (pathIndex > index) {
          if (!obj['close']) return obj;
        }
        if (pathIndex <= index) return obj;
      });
    },
    async closeRightTab(tabPath: string) {
      const pathIndex = this.tabsMenuList.findIndex(obj => obj.path === tabPath);
      this.tabsMenuList = this.tabsMenuList.filter((obj, index) => {
        if (pathIndex >= index) return obj;
        if (!obj['close']) return obj;
      });
      const lastPath = this.tabsMenuList[this.tabsMenuList.length - 1].path;
      router.push(lastPath);
    },
    async rightCloseMultipleTab(tabPath: string) {
      this.tabsMenuList = this.tabsMenuList.filter(tab => {
        return tab.path === tabPath || !tab.close;
      });
      router.push(tabPath);
    },
  },
  persist: piniaPersistConfig('app-tabs'),
});
