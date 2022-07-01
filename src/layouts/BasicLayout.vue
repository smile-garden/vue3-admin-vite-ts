<template>
  <a-layout has-sider>
    <app-sider
      :collapsed="collapsed"
    />
    <a-layout
      :style="{ marginLeft: collapsed ? '80px' : '200px' }"
      class="app-main">
      <app-header
        :collapsed="collapsed"
        @fold="handleFold"
      />
      <a-layout-content class="app-content">
        <router-view />
      </a-layout-content>
      <app-footer />
    </a-layout>
  </a-layout>

  <set-theme-color
  />
</template>

<script setup lang='ts'>
import { provide, ref } from 'vue';
import { useStore } from '@/store';
import AppSider from './AppSider.vue';
import AppHeader from './AppHeader.vue';
import AppFooter from './AppFooter.vue';
import SetThemeColor from './SetThemeColor.vue';

const collapsed = ref(false);
const handleFold = () => {
  collapsed.value = !collapsed.value;
};

const store = useStore();
provide('store', store);
</script>

<style lang='less' scoped>
.app {
  &-main {
    min-height: 100vh;
    transition: all 0.2s;
    overflow: hidden;
  }

  &-content {
    margin-top: 64px;
    padding: 8px;
  }
}
</style>
