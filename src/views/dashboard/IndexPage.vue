<template>
  <a-row :gutter="[8, 8]">
    <a-col v-bind="itemLayout">
      <a-card :bordered="false">
        <radar-data />
      </a-card>
    </a-col>
    <a-col v-bind="itemLayout">
      <a-card :bordered="false">
        <bar-chart />
      </a-card>
    </a-col>
    <a-col v-bind="itemLayout">
      <a-card :bordered="false">
        <pie-chart />
      </a-card>
    </a-col>
    <a-col v-bind="itemLayout">
      <a-card :bordered="false">
        <area-chart />
      </a-card>
    </a-col>
    <a-col v-bind="itemLayout">
      <a-card :bordered="false">
        <water-chart />
      </a-card>
    </a-col>
  </a-row>
</template>

<script setup lang='ts'>
import RadarData from './components/RadarData.vue';
import BarChart from './components/BarChart.vue';
import PieChart from './components/PieChart.vue';
import AreaChart from './components/AreaChart.vue';
import WaterChart from './components/WaterChart.vue';

const itemLayout = {
  md: 24,
  lg: 12,
  xxl: 8,
};
</script>
