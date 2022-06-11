<script setup lang="ts">
import {
  ref,
  onMounted,
  onUpdated,
  onRenderTracked,
  onRenderTriggered,
} from 'vue';
import ModalImg from './ModalImg.vue';

const str: string = 'sdfds';
const count = ref(0);

onMounted(() => {
  console.log(str);
});
console.log(count);
console.log(count.value);

onUpdated(() => {
  console.log('update', 'feewrew');
});

onRenderTracked((e) => {
  console.log(e);
});

onRenderTriggered((e) => {
  console.log(e, '状态触发组件');
});
</script>

<template>
  <modal-img />
  <button @click="count++">count is: {{ count }}</button>
  <p>
    Edit
  </p>
</template>

<style scoped>
a {
  color: #42b983;
}
</style>
