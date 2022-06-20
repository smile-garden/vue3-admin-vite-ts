<template>
  <div class="account-wrapper">
    <router-view />
    <div class="account-footer">
      <app-footer />
    </div>
  </div>
</template>

<script setup lang='ts'>
import AppFooter from './AppFooter.vue';
</script>

<style lang='less' scoped>
.account {
  &-wrapper {
    width: 100%;
    min-height: 100vh;
    background-color: #f0f2f5;
  }

  :deep(&-lang) {
    position: absolute;
    top: 16px;
    right: 16px;
    line-height: 1;
    font-size: 24px;
  }

  &-footer {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
  }
}
</style>
