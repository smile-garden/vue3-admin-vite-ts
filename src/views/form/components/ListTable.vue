<template>
  <a-table
    size="middle"
    bordered
    :loading="loading"
    :columns="columns"
    row-key="id"
    :data-source="list"
  />
</template>

<script setup lang='ts'>
import type { TableColumnType } from 'ant-design-vue';

/* defineProps({
  loading: {
    type: Boolean,
    default: false,
  },
  list: {
    type: Array,
    default: () => ([]),
  },
}); */

interface Props {
  loading: boolean,
  list: any[],
}

withDefaults(defineProps<Props>(), {
  loading: false,
  list: () => ([]),
});

interface Column {
  title: string,
  dataIndex: string,
}

const columns: TableColumnType<Column>[] = [
  {
    title: '姓名',
    dataIndex: 'userName',
  },
  {
    title: '年龄',
    dataIndex: 'age',
  },
  {
    title: '分数',
    dataIndex: 'score',
  },
  {
    title: '时间',
    dataIndex: 'date',
  },
];
</script>
