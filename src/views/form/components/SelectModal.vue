<template>
  <a-modal
    v-model:visible="visible"
    :width="600"
    title="选择modal"
    @ok="save">
    <a-table
      size="small"
      bordered
      :loading="loading"
      :data-source="list"
      :columns="columns"
      row-key="id"
      :row-selection="rowSelection"
    />
  </a-modal>
</template>

<script setup lang='ts'>
import {
  reactive,
  computed,
  toRefs,
  onMounted,
} from 'vue';
import { message } from 'ant-design-vue';
import { getSelectList } from '@/api/index';
import type { TableColumnType } from 'ant-design-vue';

/* const props = defineProps({
  tableType: {
    type: String,
    default: 'checkbox',
  },
  getCheckboxProps: {
    type: Function,
    default: () => ({ props: {} }),
  },
}); */

interface Props {
  tableType?: string,
  getCheckboxProps?: any,
}

const props = withDefaults(defineProps<Props>(), {
  tableType: 'checkbox',
  getCheckboxProps: () => ({}),
});

interface DataType {
  age: number,
  date: string,
  id: string,
  score: number,
  userName: string,
}

const columns: TableColumnType<DataType>[] = [
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

interface State {
  visible: boolean,
  loading: boolean,
  list: DataType[],
  selectedRowKeys: string[],
}

const state = reactive<State>({
  visible: false,
  loading: false,
  list: [],
  selectedRowKeys: [],
});

let selectedRows: DataType[] = [];

const onChange = (selectedRowKeys: string[], list: DataType[]) => {
  state.selectedRowKeys = selectedRowKeys;
  selectedRows = list;
};

const rowSelection = computed(() => ({
  type: props.tableType,
  selectedRowKeys: state.selectedRowKeys,
  onChange,
  getCheckboxProps: props.getCheckboxProps,
}));

const getList = () => {
  state.loading = true;
  getSelectList({})
    .then((res) => {
      state.loading = false;
      state.list = res.list || [];
    })
    .catch((err) => {
      state.loading = false;
      message.error(err.msg);
    });
};

const {
  visible,
  loading,
  list,
} = toRefs(state);

const show = () => {
  state.visible = true;
  // getList(); // mock数据 模拟选中暂时在mounted获取数据
};
const hide = () => {
  state.visible = false;
};

onMounted(() => {
  getList();
});

const emits = defineEmits(['save']);

const save = () => {
  if (!state.selectedRowKeys.length) {
    message.error('至少选择一项');
    return;
  }
  emits('save', state.selectedRowKeys, selectedRows, () => {
    state.selectedRowKeys = [];
    hide();
  });
};

defineExpose({
  show,
});
</script>
