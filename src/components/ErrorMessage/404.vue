<template>
  <div class="not-container">
    <div class="not-detail">
      <h2>404</h2>
      <h4>Sorry, the page you visited does not exist~🤷‍♂️🤷‍♀️</h4>
      <a-button type="primary" @click="router.push(HOME_URL)">Return to Home</a-button>
    </div>
  </div>
</template>

<script setup lang="ts" name="404">
  import { useRouter } from 'vue-router';
  import { HOME_URL } from '@/config';
  const router = useRouter();
</script>

<style scoped lang="less">
  @import url('./index.less');
</style>
