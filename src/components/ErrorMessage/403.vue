<template>
  <div class="not-container">
    <img src="@/assets/images/403.png" class="not-img" alt="403" />
    <div class="not-detail">
      <h2>403</h2>
      <h4>Sorry, you don't have permission to access this page~🙅‍♂️🙅‍♀️</h4>
      <a-button type="primary" @click="router.push(HOME_URL)">Return to Home</a-button>
    </div>
  </div>
</template>

<script setup lang="ts" name="403">
  import { useRouter } from 'vue-router';
  import { HOME_URL } from '@/config';
  const router = useRouter();
</script>

<style scoped lang="less">
  @import url('./index.less');
</style>
