<template>
  <a-button type="primary" @click="update">更新</a-button>
  <div id="water-container">
    <!-- 水波纹图 -->
  </div>
</template>

<script setup lang='ts'>
import { onMounted, onBeforeUnmount } from 'vue';
import { Liquid, measureTextWidth } from '@antv/g2plot';

let liquidPlot: any = null;
const initRender = () => {
  liquidPlot = new Liquid(document.getElementById('water-container')!, {
    autoFit: true,
    percent: 0.36,
    radius: 0.8,
    statistic: {
      title: {
        formatter: () => '盈利率',
        style: ({ percent }: any) => ({
          fill: percent > 0.65 ? 'white' : 'rgba(44,53,66,0.85)',
        }),
      },
      content: {
        style: ({ percent }: any): any => ({
          fontSize: 60,
          lineHeight: 1,
          fill: percent > 0.65 ? 'white' : 'rgba(44,53,66,0.85)',
        }),
        customHtml: (container: any, view: any, { percent }: any) => {
          const { width, height } = container.getBoundingClientRect();
          const d = Math.sqrt((width / 2) ** 2 + (height / 2) ** 2);
          const text = `占比 ${(percent * 100).toFixed(0)}%`;
          const textWidth = measureTextWidth(text, { fontSize: 60 });
          const scale = Math.min(d / textWidth, 1);
          return `<div style="
            width: ${d}px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: ${scale}em;
            line-height: ${scale <= 1 ? 1 : 'inherit'}">${text}</div>`;
        },
      },
    },
    liquidStyle: ({ percent }: { percent: number }) => ({
      fill: percent > 0.45 ? '#5B8FF9' : '#FAAD14',
      stroke: percent > 0.45 ? '#5B8FF9' : '#FAAD14',
    }),
    color: () => '#5B8FF9',
  });
  liquidPlot.render();
};

const update = () => {
  let data = 0.25;
  const interval = setInterval(() => {
    data += Math.min(Math.random() * 0.1, 0.1);
    if (data < 0.75) {
      liquidPlot.changeData(data);
    } else {
      clearInterval(interval);
    }
  }, 500);
};

onMounted(() => {
  initRender();
});

onBeforeUnmount(() => {
  if (liquidPlot) {
    liquidPlot.destroy();
  }
  liquidPlot = null;
});
</script>
