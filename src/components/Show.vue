<template>
  <img :src="result?.message" />
</template>

<!--
<script lang="ts">
import axios from 'axios';
import { defineComponent } from 'vue'
export default defineComponent({
  async setup() {
    const res = await axios.get('https://dog.ceo/api/breeds/image/random');

    return {
      result: res.data,
    };
  }
})
</script>
-->

<script setup lang="ts">
import axios from 'axios';
const { data: result } = await axios.get('https://dog.ceo/api/breeds/image/random');
</script>
