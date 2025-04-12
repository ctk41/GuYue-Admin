<template>
  <div class="card content-box">
    <a-alert class="w-100 mb-20" message="我是 Tab 详情页 🍓🍇🍈🍉" type="info" />
    <a-alert class="w-100 mb-20" :message="`params: ${route.params}`" type="info" />
  </div>
</template>

<script setup lang="ts" name="tabsDetail">
import { useRoute } from 'vue-router';
import { useTabsStore } from '@/stores/modules/tabs';

const route = useRoute();
const tabStore = useTabsStore();

tabStore.setTabsTitle(`No.${route.params.id} - ${route.meta.title}`);
</script>
