<template>
  <teleport to="#modal">
    <div id="center">
      <button type="primary" @click="update" class="btn">更新</button>
      <div v-if="loading">Loading.....</div>
      <img v-if="loaded" :src="result.message" />
    </div>
  </teleport>
</template>

<script setup>
import { reactive, toRefs } from 'vue';
import useUrlAxios from '../hooks/useUrlAxios.ts';

let res = reactive({});
const update = () => {
  const {
    result,
    loading,
    loaded,
  } = useUrlAxios('https://dog.ceo/api/breeds/image/random');
  res.result = result;
  res.loading = loading;
  res.loaded = loaded;
}

update()

const {
  result,
  loading,
  loaded,
} = toRefs(res);
</script>

<!--
<script>
import { reactive, toRefs } from 'vue';
import useUrlAxios from '../hooks/useUrlAxios.ts';
export default {
  setup() {
    let res = reactive({});
    const update = () => {
      const {
        result,
        loading,
        loaded,
      } = useUrlAxios('https://dog.ceo/api/breeds/image/random');
      res.result = result;
      res.loading = loading;
      res.loaded = loaded;
    }

    update()

    return {
      ...toRefs(res),
      update,
    }
  }
}
</script>
-->

<style scoped>
#center {
  position: fixed;
  right: 0;
  bottom: 0;
  width: 200px;
  height: 200px;
  border: 2px solid black;
  background: white;
  overflow: hidden;
}

#center img {
  max-width: 100%;
  height: auto;
}

.btn {
  position: absolute;
  top: 0;
  right: 0;
}
</style>
