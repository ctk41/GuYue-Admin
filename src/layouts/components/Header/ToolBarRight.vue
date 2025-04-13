<template>
  <div class="tool-bar-ri">
    <div class="header-icon">
      <AssemblySize id="assembly-size" />
      <Language id="language" />
      <SearchMenu id="search-menu" />
      <ThemeSetting id="theme-setting" />
      <Message id="message" />
      <Fullscreen id="fullscreen" />
    </div>
    <span class="username">admin</span>
    <Avatar />
  </div>
</template>

<script setup lang="ts" name="ToolBarRight">
  import AssemblySize from './components/AssemblySize.vue';
  import Language from './components/Language.vue';
  import SearchMenu from './components/SearchMenu.vue';
  import ThemeSetting from './components/ThemeSetting.vue';
  import Message from './components/Message.vue';
  import Fullscreen from './components/Fullscreen.vue';
  import Avatar from './components/Avatar.vue';
</script>

<style scoped lang="less">
  .tool-bar-ri {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    margin: 0 30px 0 0;

    .header-icon {
      display: flex;
      align-items: center;
      height: 100%;
      #assembly-size,
      #language,
      #search-menu,
      #theme-setting,
      #message,
      #fullscreen {
        height: 100%;
        margin-right: 21px;
        line-height: 55px;
      }
      #message {
        padding-top: 3px;
      }
      #fullscreen {
        padding-top: 2px;
      }
    }
    .username {
      height: 100%;
      padding-top: 2px;
      margin: 0 20px 0 0;
      font-size: 15px;
      line-height: 55px;
    }
  }
</style>
