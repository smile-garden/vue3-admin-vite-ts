<template>
  <a-config-provider :locale="antLocale">
    <router-view />
  </a-config-provider>
</template>

<script setup lang='ts'>
import { computed } from 'vue';
import { useI18n } from 'vue-i18n/index';
import { useRoute } from 'vue-router';
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
import { setDocumentTitle } from '@/utils/util';

const { locale, getLocaleMessage } = useI18n();
const antLocale = computed(() => {
  const { meta: { title } }: any = useRoute();
  if (title) setDocumentTitle(title);
  return getLocaleMessage(locale.value).antLocale;
});

dayjs.locale(locale.value);
</script>
