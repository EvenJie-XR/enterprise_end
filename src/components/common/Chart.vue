<template>
    <div class="chart-container" ref="chart">

    </div>
</template>
<script lang="ts" setup>
import * as echarts from 'echarts';
import { onMounted, ref } from 'vue';

const chart = ref();
const props = defineProps({
    chartOption: Object
})
onMounted(() => {
    const myChart = echarts.init(chart.value);
    // @ts-ignore
    myChart.setOption(props.chartOption);
    window.addEventListener('resize', function() {
        myChart.resize();
    });
})
</script>

<style lang="scss" scoped>
.chart-container {

}
</style>
