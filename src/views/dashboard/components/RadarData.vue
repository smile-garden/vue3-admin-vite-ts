<template>
  <a-button type="primary" @click="update">{{ $t('action.update') }}</a-button>
  <div id="radar-container">
    <!-- 雷达图容器盒子 -->
  </div>
</template>

<script lang='ts'>
import { defineComponent } from 'vue';
import DataSet from '@antv/data-set';
import { Chart } from '@antv/g2';
import { getRadarData } from '@/api';

export default defineComponent({
  data() {
    return {
      data: [],
      chart: null,
    };
  },
  async mounted() {
    await this.getList();
    this.initRender();
  },
  beforeMount() {
    if (this.chart) this.chart.destroy();
    this.chart = null;
  },
  methods: {
    async getList() {
      await getRadarData({})
        .then((res: any) => {
          this.data = res.list || [];
        });
    },
    transformData(data: []) {
      const { DataView } = DataSet;
      const dv = new DataView().source(data);
      dv.transform({
        type: 'fold',
        fields: ['a', 'b', 'c', 'd', 'e'], // 展开字段集
        key: 'user', // key字段
        value: 'score', // value字段
      });
      return dv.rows;
    },
    initRender() {
      const data = this.transformData(this.data);
      const chart = new Chart({
        container: 'radar-container',
        autoFit: true,
        height: 500,
      });
      chart.data(data);
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

      this.$nextTick(() => {
        chart.render();
        this.chart = chart;
      });
    },
    async update() {
      await this.getList();
      this.chart.changeData(this.transformData(this.data));
    },
  },
});
</script>
