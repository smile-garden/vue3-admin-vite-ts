<template>
  <a-page-header>
    <template #title>
      富文本编辑器wangEditor：
      <a href="https://www.wangeditor.com/v5/for-frame.html#vue3" target="_blank">参考文档</a>
    </template>
  </a-page-header>

  <a-card :bordered="false">
    <a-row :gutter="[16, 16]">
      <a-col v-bind="itemLayout">
        <div class="editor-box editor-border">
          <Toolbar
            style="border-bottom: 1px solid #ccc;"
            :editor="editorRef"
            :default-config="toolbarConfig"
            :mode="mode"
          />
          <Editor
            v-model="valueHtml"
            style="height: 500px; overflow-y: hidden;"
            :default-config="editorConfig"
            :mode="mode"
            @on-created="handleCreated"
          />
        </div>
      </a-col>
      <a-col v-bind="itemLayout">
        <div class="editor-border">
          <a-page-header
            title="预览HTML"
          />
          <div style="padding: 0 20px 20px 20px;">{{ valueHtml }}</div>
        </div>
      </a-col>
    </a-row>
  </a-card>
</template>

<script setup lang='ts'>
import '@wangeditor/editor/dist/css/style.css'; // 引入 css

import {
  onBeforeUnmount, ref, shallowRef, onMounted,
} from 'vue';
import { Editor, Toolbar } from '@wangeditor/editor-for-vue';

const itemLayout = {
  xs: 24,
  xl: 12,
};
// 编辑器实例，必须用 shallowRef
const editorRef = shallowRef();
const mode = 'default'; // 或 'simple'

// 内容 HTML
const valueHtml = ref('<p>hello</p>');

// 模拟 ajax 异步获取内容
onMounted(() => {
  setTimeout(() => {
    valueHtml.value = '<p>由你定义</p>';
  }, 1500);
});

const toolbarConfig = {};
const editorConfig = { placeholder: '请输入内容...' };

// 组件销毁时，也及时销毁编辑器
onBeforeUnmount(() => {
  const editor = editorRef.value;
  if (editor == null) return;
  editor.destroy();
});

const handleCreated = (editor: any) => {
  editorRef.value = editor; // 记录 editor 实例，重要！
};
</script>

<style scoped lang="less">
.editor {
  &-box {
    z-index: 999;
  }

  &-border {
    width: 100%;
    border: 1px solid #ccc;
  }
}
</style>
