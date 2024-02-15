<template>
    <div class="chart-container" ref="chart">

    </div>
</template>
<script lang="ts" setup>
import * as echarts from 'echarts';
import { onMounted, ref, watch } from 'vue';

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
    // 监听外部传入的option是否更新，如果更新了就重新setOption
    watch(() => props.chartOption, () => {
        // @ts-ignore
        myChart.setOption(props.chartOption);
    })
})

</script>

<style lang="scss" scoped>
.chart-container {

}
</style>
