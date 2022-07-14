<template>
  <a-card :bordered="false">
    <a-form layout="inline" class="app-filter-wrapper">
      <a-form-item :label="t('user.name')">
        <a-input v-model:value="queryParams.name" :placeholder="t('common.pleaseInput')" />
      </a-form-item>
      <a-form-item>
        <a-space>
          <a-button type="primary" @click="searchQuery">{{ t('action.search') }}</a-button>
          <a-button @click="resetQuery">{{ t('action.reset') }}</a-button>
        </a-space>
      </a-form-item>
    </a-form>

    <a-table
      :columns="columns"
      :data-source="currentList"
      :loading="loading"
      :pagination="false"
    />

    <a-pagination
      v-if="total"
      v-model:current="queryParams.pageNum"
      class="ant-table-pagination ant-table-pagination-right"
      show-quick-jumper
      :total="total"
      :show-total="(total: number) => `${t('common.total')} ${total} ${t('common.item')}`"
      @change="change"
    />
  </a-card>
</template>

<script setup lang='ts'>
import { computed } from 'vue';
import { useI18n } from 'vue-i18n/index';
import handleData from './components/handleData';

const { t } = useI18n();
const columns = computed(() => [
  {
    title: t('user.name'),
    dataIndex: 'name',
  },
  {
    title: t('user.age'),
    dataIndex: 'age',
  },
  {
    title: t('user.address'),
    dataIndex: 'address',
  },
]);

const {
  loading,
  queryParams,
  list,
  total,
  searchQuery,
  resetQuery,
  change,
} = handleData();

const currentList = computed(() => {
  const start = (queryParams.pageNum - 1) * queryParams.pageSize;
  const end = queryParams.pageNum * queryParams.pageSize;
  return list.value.slice(start, end);
});
</script>
