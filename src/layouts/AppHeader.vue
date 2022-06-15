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
  </a-layout-header>
</template>

<script setup lang='ts'>
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from '@ant-design/icons-vue';

defineProps({
  collapsed: {
    type: Boolean,
    required: true,
  },
});

const route = useRoute();
const breadcrumbs = computed(() => route.matched.slice(1));
const emit = defineEmits(['fold']);
const handleFold = () => {
  emit('fold');
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
