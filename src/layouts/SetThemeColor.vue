<template>
  <a-modal
    v-model:visible="visible"
    :width="420"
    @ok="handleOk()">
    <template #title>
      {{ $t('action.set') }}
      <a-button
        size="small"
        type="link"
        @click="handleOk(true)">
        {{ $t('action.reset') }}
      </a-button>
    </template>
    <input
      v-model="color"
      class="theme-color"
      type="color"
    />
  </a-modal>
  <a-button
    v-show="!visible"
    class="theme-set"
    type="primary"
    size="large"
    @click="toggleModal">
    <template #icon>
      <setting-outlined />
    </template>
  </a-button>
</template>

<script setup lang='ts'>
import { ref } from 'vue';
import { useStore } from '@/store';
import { useI18n } from 'vue-i18n/index';
import { ConfigProvider, message } from 'ant-design-vue';
import { SettingOutlined } from '@ant-design/icons-vue';

const { t } = useI18n();
const store: any = useStore();
const visible = ref(false);
const color = ref(store.getters.themeColor);
const toggleModal = () => {
  visible.value = !visible.value;
};

let init = true;
const handleOk = (reset = false) => {
  if (reset) {
    color.value = '#1890ff';
  }
  if (!color.value) {
    message.error(t('common.pleaseSelect'));
    return;
  }
  ConfigProvider.config({
    theme: {
      primaryColor: color.value,
    },
  });
  store.commit('SET_THEME_COLOR', color.value);
  if (!init) toggleModal();
};

handleOk();
init = false;
</script>

<style lang='less' scoped>
.theme {
  &-color[type=color] {
    margin: 0 auto;
    display: block;
    width: 300px;
    height: 120px;
  }

  &-set {
    position: fixed;
    right: 0;
    bottom: 60px;
    font-size: 20px;
  }
}
</style>
