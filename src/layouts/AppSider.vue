<template>
  <a-layout-sider
    :style="{
      position: 'fixed',
      top: 0,
      bottom: 0,
      left: 0,
      height: '100vh',
      overflow: 'auto',
    }"
    :collapsed="collapsed"
    :trigger="null"
    collapsible>
    <div class="sider-logo">
      <div class="sider-logo__inner">
        <SmileFilled
          class="sider-logo__img"
        />
        <span class="sider-logo__text">{{ t('menu.head') }}</span>
      </div>
    </div>
    <a-menu
      mode="inline"
      theme="dark"
      :selected-keys="selectedKeys"
      :open-keys="openKeys"
      @open-change="onOpenChange"
      @click="handleClick">
      <template v-for="item in menus" :key="item.path">
        <template v-if="item.children && item.children.length">
          <a-sub-menu :key="item.path">
            <template #icon>
              <component :is="item.meta.icon" />
            </template>
            <template #title>{{ t(`menu.${item.meta.title}`) }}</template>
            <template v-for="subItem in item.children" :key="subItem.path">
              <template v-if="subItem.children && subItem.children.length">
                <a-sub-menu :key="subItem.path">
                  <template #title>{{ t(`menu.${subItem.meta.title}`) }}</template>
                  <a-menu-item
                    v-for="l3Item in subItem.children"
                    :key="l3Item.path">
                    {{ t(`menu.${l3Item.meta.title}`) }}
                  </a-menu-item>
                </a-sub-menu>
              </template>
              <template v-else>
                <a-menu-item :key="subItem.path">
                  {{ t(`menu.${subItem.meta.title}`) }}
                </a-menu-item>
              </template>
            </template>
          </a-sub-menu>
        </template>
        <template v-else>
          <a-menu-item :key="item.path">
            <template #icon>
              <component :is="item.meta.icon" />
            </template>
            {{ t(`menu.${item.meta.title}`) }}
          </a-menu-item>
        </template>
      </template>
    </a-menu>
  </a-layout-sider>
</template>

<script setup lang='ts'>
import {
  reactive,
  computed,
  toRefs,
} from 'vue';
import { useRouter, useRoute, RouteRecordRaw } from 'vue-router';
import { useI18n } from 'vue-i18n/index';
import { routes } from '@/router/routes/index';
import { SmileFilled } from '@ant-design/icons-vue';

defineProps({
  collapsed: {
    type: Boolean,
    required: true,
  },
});

type RouteConfig = RouteRecordRaw & { meta?: any, children?: RouteConfig[] };
interface StateInt {
  menus: RouteConfig[],
  openKeys: string[],
}

const state = reactive<StateInt>({
  menus: routes[0].children || [],
  openKeys: [],
});
const rootSubmenuKeys = state.menus.map((menu) => menu.path);
const router = useRouter();
const route = useRoute();
const { t } = useI18n();
const selectedKeys = computed(() => [route.path]);
const matchPaths = (route.matched || []).map((v) => v.path);
state.openKeys = matchPaths.length > 1
  ? matchPaths.slice(1, matchPaths.length - 1) : matchPaths;

const onOpenChange = (openKeys: string[]) => {
  const latestOpenKey: string = openKeys.find((key: string) => !state.openKeys.includes(key)) || '';
  if (rootSubmenuKeys.includes(latestOpenKey)) {
    state.openKeys = latestOpenKey ? [latestOpenKey] : [];
  } else {
    state.openKeys = openKeys;
  }
};

const handleClick = ({ key }: { key: string }) => {
  if (route.path !== key) {
    router.push(key);
  }
};

const { menus, openKeys } = toRefs(state);
</script>

<style lang='less' scoped>
.sider {
  &-logo {
    position: relative;
    padding: 12px;
    height: 64px;

    &__inner {
      height: 40px;
      background-color: rgba(255,255,255,.3);
      font-size: 24px;
      line-height: 40px;
      text-align: center;
      color: #fff;
      overflow: hidden;
    }

    &__img {
      margin: 0 6px;
    }

    &__text {
      margin: 0 6px;
      vertical-align: top;
      font-size: 20px;
    }
  }
}
</style>
