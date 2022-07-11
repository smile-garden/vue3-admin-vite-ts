<template>
  <a-dropdown>
    <a class="ant-dropdown-link" @click.prevent>
      <span v-show="false">语言切换</span>
      <global-outlined />
    </a>
    <template #overlay>
      <a-menu @click="switchLang">
        <a-menu-item
          v-for="(item, key) in $i18n.messages"
          :key="key"
          :disabled="$i18n.locale === key">
          {{ item.langName }}
        </a-menu-item>
      </a-menu>
    </template>
  </a-dropdown>
</template>

<script setup lang='ts'>
import { useStore } from '@/store';
import { useI18n } from 'vue-i18n/index';
import { GlobalOutlined } from '@ant-design/icons-vue';

const store: any = useStore();
const { locale } = useI18n({ useScope: 'global' });
const switchLang = ({ key }: any) => {
  locale.value = key;
  store.commit('SET_LANG', key);
};
</script>
