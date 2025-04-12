<template>
  <div class="login-container flx-center">
    <SwitchDark class="dark" />
    <div class="login-box">
      <div class="login-left"></div>
      <div class="login-form">
        <div class="login-logo">
          <img class="login-icon" src="@/assets/images/logo.svg" alt="" />
          <h2 class="logo-text">VTI CORP</h2>
        </div>
        <LoginForm />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts" name="login">
  import SwitchDark from '@/components/SwitchDark/index.vue';
  import LoginForm from './components/LoginForm.vue';
</script>

<style scoped lang="less">
  @import url('./index.less');
</style>
