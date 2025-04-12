<template>
  <a-layout class="layout">
    <a-layout-header class="transverse-header">
      <div class="logo flx-center">
        <img class="logo-img" src="@/assets/images/logo.svg" alt="logo" />
        <span class="logo-text">VTI CORP</span>
      </div>
      <a-menu v-model:selectedKeys="activeMenu" :theme="'dark'" mode="horizontal" :style="{ lineHeight: '55px' }">
        <template v-for="subItem in menuList" :key="subItem.name">
          <a-sub-menu v-if="subItem.children && subItem.children?.length > 0" :key="subItem.path">
            <template #icon>
              <component :is="subItem.meta.icon"></component>
            </template>
            <template #title>
              <span>{{ subItem.meta.title }}</span>
            </template>
            <SubMenu :menuList="subItem.children" />
          </a-sub-menu>
          <a-menu-item v-else :key="subItem.path + ''" @click="handleClickMenu(subItem)">
            <template #icon>
              <component :is="subItem.meta.icon"></component>
            </template>
            <span>{{ subItem.meta.title }}</span>
          </a-menu-item>
        </template>
      </a-menu>
      <div class="tool-bar-container"><ToolBarRight /></div>
    </a-layout-header>
    <Main />
  </a-layout>
</template>

<script setup lang="ts" name="layoutTransverse">
  import { ref, computed, watchEffect } from 'vue';
  import { useRoute, useRouter } from 'vue-router';
  import { useAuthStore } from '@/stores/modules/auth';
  import SubMenu from '@/layouts/components/Menu/SubMenu.vue';
  import ToolBarRight from '@/layouts/components/Header/ToolBarRight.vue';
  import Main from '@/layouts/components/Main/index.vue';

  const route = useRoute();
  const authStore = useAuthStore();
  const activeMenu = ref<Array<string>>([]);
  const menuList = computed(() => authStore.showMenuListGet);

  watchEffect(() => {
    let key = route.meta.activeMenu ? route.meta.activeMenu : route.path;
    activeMenu.value = [key + ''];
  });

  const router = useRouter();
  const handleClickMenu = (subItem: Menu.MenuOptions) => {
    if (subItem.meta.isLink) return window.open(subItem.meta.isLink, '_blank');
    router.push(subItem.path);
  };
</script>

<style scoped lang="less">
  @import url('./index.less');
</style>
