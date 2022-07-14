<template>
  <a-layout has-sider style="height: 100%;">
    <template v-if="isMobile">
      <a-drawer
        v-model:visible="visible"
        class="app-drawer"
        :placement="'left'"
        :width="200"
        :closable="false">
        <app-sider
          :collapsed="collapsed"
        />
      </a-drawer>
    </template>
    <app-sider
      v-else
      :collapsed="collapsed"
    />
    <a-layout
      class="app-main">
      <app-header
        :collapsed="collapsed"
        :is-mobile="isMobile"
        @fold="handleToggle"
      />
      <a-layout-content class="app-content">
        <router-view />
        <app-footer />
      </a-layout-content>
    </a-layout>
  </a-layout>

  <set-theme-color
  />
</template>

<script setup lang='ts'>
import { ref } from 'vue';
import { queryMedia } from '@convue-lib/utils';
import AppSider from './AppSider.vue';
import AppHeader from './AppHeader.vue';
import AppFooter from './AppFooter.vue';
import SetThemeColor from './SetThemeColor.vue';

const isMobile = ref<boolean>(false);
queryMedia((data: string) => {
  isMobile.value = data === 'xs';
});

const visible = ref<boolean>(false);
const collapsed = ref<boolean>(false);

const handleDrawer = () => {
  visible.value = !visible.value;
};

const handleFold = () => {
  collapsed.value = !collapsed.value;
};

const handleToggle = () => {
  if (isMobile.value) {
    handleDrawer();
    return;
  }
  handleFold();
};
</script>

<style lang='less' scoped>
.app {
  &-main {
    min-height: 100vh;
    transition: all 0.2s;
    overflow: hidden;
  }

  &-content {
    flex: auto;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 8px;
    overflow: auto;
  }
}
</style>
