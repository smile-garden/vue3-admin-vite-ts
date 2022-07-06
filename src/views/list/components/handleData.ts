import { getList } from '@/api';
import { message } from 'ant-design-vue';
import { ref, onMounted, reactive } from 'vue';

export default function getTableList() {
  const loading = ref(false);
  let cacheList: any = [];
  const list = ref([]);
  const total = ref(0);

  interface QueryParams {
    name: string,
    pageNum: number,
    pageSize: number,
  }

  const queryParams = reactive<QueryParams>({
    name: '',
    pageNum: 1,
    pageSize: 10,
  });

  const getListHandle = async () => {
    loading.value = true;
    await getList(queryParams)
      .then((res) => {
        loading.value = false;
        if (res) {
          list.value = res.list;
          total.value = res.list.length;
          cacheList = res.list;
        }
      })
      .catch((err) => {
        loading.value = false;
        message.error(err.message);
      });
  };

  onMounted(() => {
    getListHandle();
  });

  const change = (page: number, pageSize: number) => {
    queryParams.pageNum = page;
    queryParams.pageSize = pageSize;
  };

  const searchQuery = () => {
    queryParams.pageNum = 1;
    list.value = cacheList.filter((v: any) => v.name.includes(queryParams.name));
  };

  const resetQuery = () => {
    queryParams.name = '';
    queryParams.pageNum = 1;
    queryParams.pageSize = 10;
    list.value = cacheList;
  };

  return {
    loading,
    queryParams,
    list,
    total,
    searchQuery,
    resetQuery,
    change,
  };
}
