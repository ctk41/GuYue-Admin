<template>
  <div class="not-container">
    <img src="@/assets/images/500.png" class="not-img" alt="500" />
    <div class="not-detail">
      <h2>500</h2>
      <h4>Sorry, your network is gone~🤦‍♂️🤦‍♀️</h4>
      <a-button type="primary" @click="router.push(HOME_URL)">Return to Home</a-button>
    </div>
  </div>
</template>

<script setup lang="ts" name="500">
  import { useRouter } from 'vue-router';
  import { HOME_URL } from '@/config';
  const router = useRouter();
</script>

<style scoped lang="less">
  @import url('./index.less');
</style>
