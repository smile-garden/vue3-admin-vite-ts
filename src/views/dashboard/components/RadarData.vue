<template>
  <a-button type="primary" @click="update">{{ $t('action.update') }}</a-button>
  <div id="radar-container1">
    <!-- 雷达图容器盒子 -->
  </div>
</template>

<script setup lang='ts'>
import { onMounted, onBeforeUnmount, nextTick } from 'vue';
import DataSet from '@antv/data-set';
import { Chart } from '@antv/g2';
import { getRadarData } from '@/api';

let list: [] = [];
let initChart: any = null;

const getList = async () => {
  await getRadarData({})
    .then((res: any) => {
      list = res.list || [];
    });
};

const transformData = (data: []) => {
  const { DataView } = DataSet;
  const dv = new DataView().source(data);
  dv.transform({
    type: 'fold',
    fields: ['a', 'b', 'c', 'd', 'e'], // 展开字段集
    key: 'user', // key字段
    value: 'score', // value字段
  });
  return dv.rows;
};

const initRender = () => {
  const newList = transformData(list);
  const chart = new Chart({
    container: 'radar-container1',
    autoFit: true,
    height: 500,
  });
  chart.data(newList);
  chart.scale('score', {
    min: 0,
    max: 80,
  });
  chart.coordinate('polar', {
    radius: 0.8,
  });
  chart.tooltip({
    shared: true,
    showCrosshairs: true,
    crosshairs: {
      line: {
        style: {
          lineDash: [4, 4],
          stroke: '#333',
        },
      },
    },
  });
  chart.axis('item', {
    line: null,
    tickLine: null,
    grid: {
      line: {
        style: {
          lineDash: null,
        },
      },
    },
  });
  chart.axis('score', {
    line: null,
    tickLine: null,
    grid: {
      line: {
        type: 'circle',
        style: {
          lineDash: null,
        },
      },
    },
  });

  chart.line().position('item*score').color('user').size(2);
  chart.point().position('item*score').color('user').shape('circle')
    .size(4)
    .style({
      stroke: '#fff',
      lineWidth: 1,
      fillOpacity: 1,
    });
  chart.area().position('item*score').color('user');

  nextTick(() => {
    chart.render();
    initChart = chart;
  });
};

const update = async () => {
  await getList();
  initChart.changeData(transformData(list));
};

onMounted(async () => {
  await getList();
  initRender();
});

onBeforeUnmount(() => {
  if (initChart) initChart.destroy();
  initChart = null;
});
</script>
