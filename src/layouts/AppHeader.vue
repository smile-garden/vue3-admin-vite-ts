<template>
  <a-layout-header
    class="header-box"
    :style="{
      left: collapsed ? '80px' : '200px',
    }">
    <div class="header-nav">
      <!-- 展开折叠开关 -->
      <div class="header-fold">
        <component
          :is="collapsed ? MenuUnfoldOutlined : MenuFoldOutlined"
          @click="handleFold"
        />
      </div>
      <!-- 面包屑 -->
      <a-breadcrumb class="header-breadcrumb ml10">
        <a-breadcrumb-item
          v-for="(item, index) in breadcrumbs"
          :key="item.path">
          <router-link
            v-if="index !== breadcrumbs.length - 1"
            :to="item.path">
            {{ $t(`menu.${item.meta.title}`) }}
          </router-link>
          <span v-else>{{ $t(`menu.${item.meta.title}`) }}</span>
        </a-breadcrumb-item>
      </a-breadcrumb>
    </div>
    <!-- 用户信息 退出 语言切换 -->
    <div class="header-info">
      <a-dropdown>
        <a class="ant-dropdown-link" @click.prevent>
          <a-space>
            <a-avatar :size="32" :src="userInfo.avatar">
              <template #icon><user-outlined /></template>
            </a-avatar>
            <span>{{ userInfo.userName }}</span>
          </a-space>
        </a>
        <template #overlay>
          <a-menu>
            <a-menu-item @click="toSettingPage">
              <a href="javascript:;">个人设置</a>
            </a-menu-item>
            <a-menu-divider />
            <a-menu-item @click="handleLogout">
              <a href="javascript:;">退出登录</a>
            </a-menu-item>
          </a-menu>
        </template>
      </a-dropdown>
      <switch-lang
        class="header-info__lang ml10"
      />
    </div>
  </a-layout-header>
</template>

<script setup lang='ts'>
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
} from '@ant-design/icons-vue';
import store from '@/store';
import SwitchLang from '@/layouts/SwitchLang.vue';

defineProps({
  collapsed: {
    type: Boolean,
    required: true,
  },
});

const route = useRoute();
const router = useRouter();
const userInfo = computed(() => store.getters.userInfo);
const breadcrumbs = computed(() => route.matched.slice(1));
const emit = defineEmits(['fold']);
const handleFold = () => {
  emit('fold');
};

const toSettingPage = () => {};
const handleLogout = () => {
  store.dispatch('logout')
    .then(() => {
      router.push({ name: 'accountLogin' });
    });
};
</script>

<style lang='less' scoped>
.header {
  &-box {
    position: fixed;
    top: 0;
    right: 0;
    z-index: 9;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 16px;
    transition: all 0.2s;
    background-color: #fff;
    box-shadow: 0 1px 6px 1px rgba(#000, 0.1);
  }

  &-fold {
    display: inline-block;
    vertical-align: top;
    font-size: 24px;
    cursor: pointer;
  }

  &-breadcrumb {
    display: inline-block;
  }

  &-info {
    display: flex;
    align-items: center;

    :deep(&__lang) {
      display: inline-block;
      height: 100%;
      font-size: 24px;
    }
  }
}
</style>
