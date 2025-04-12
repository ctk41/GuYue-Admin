<template>
  <a-config-provider :componentSize="assemblySize" :locale="i18nLocale">
    <router-view></router-view>
    <template #renderEmpty>
      <Empty />
    </template>
  </a-config-provider>
</template>

<script setup lang="ts">
  import { computed } from 'vue';
  import { useGlobalStore } from '@/stores/modules/global';
  import { getBrowserLang } from '@/utils/util';
  import enUS from 'ant-design-vue/es/locale/en_US';
  import zhCN from 'ant-design-vue/es/locale/zh_CN';
  import { useTheme } from '@/hooks/useTheme';
  import dayjs from 'dayjs';
  import 'dayjs/locale/zh-cn';
  import Empty from '@/components/Empty/index.vue';

  const { initTheme } = useTheme();
  initTheme();

  const globalStore = useGlobalStore();

  const i18nLocale = computed(() => {
    if (globalStore.language && globalStore.language == 'en_US') {
      dayjs.locale('zh-cn');
      return enUS;
    }
    if (globalStore.language == 'en') {
      return enUS;
    }
    if (getBrowserLang() == 'en_US') {
      dayjs.locale('zh-cn');
      return zhCN;
    } else {
      return enUS;
    }
  });

  const assemblySize = computed(() => globalStore.assemblySize);
</script>

<style scoped></style>
