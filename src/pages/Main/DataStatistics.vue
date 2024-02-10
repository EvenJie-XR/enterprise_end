<template>
    <div class="data-statistics-page-container">
        <!-- 数据统计时间选择 -->
        <ModelPanel class="data-statistics-container">
            <template #header>
                <div class="header-container">
                    数据统计
                </div>
            </template>
            <template #content>
                <div class="content-container">
                    <el-tabs v-model="activeTimeName" class="time-tabs" @tab-change="handleActiveTimeChange">
                        <el-tab-pane label="昨日" name="yesterday"></el-tab-pane>
                        <el-tab-pane label="近7日" name="last7days"></el-tab-pane>
                        <el-tab-pane label="近30日" name="last30days"></el-tab-pane>
                        <el-tab-pane label="本周" name="week"></el-tab-pane>
                        <el-tab-pane label="本月" name="month"></el-tab-pane>
                    </el-tabs>
                    <el-button type="primary" color="#389E79" class="export-btn" size="large" @click="handleDataExport">数据导出</el-button>
                </div>
            </template>
        </ModelPanel>
        <!-- 营业额、用户统计、销量排名 -->
        <div class="third-panel-container">
            <!-- 营业额统计 -->
            <ModelPanel class="turnover-container">
                <template #header>
                    <div class="header-container">
                        营业额统计
                    </div>
                </template>
                <template #content>
                    <div class="content-container">
                        <Chart :chart-option="turnoverChartOption" class="chart"></Chart>
                    </div>
                </template>
            </ModelPanel>
            <!-- 用户统计 -->
            <ModelPanel class="user-statistics-container">
                <template #header>
                    <div class="header-container">
                        用户统计
                    </div>
                </template>
                <template #content>
                    <div class="content-container">
                        <Chart :chart-option="userStatisticsChartOption" class="chart"></Chart>
                    </div>
                </template>
            </ModelPanel>
            <!-- 销量排名 -->
            <ModelPanel class="sales-ranking-container">
                <template #header>
                    <div class="header-container">
                        销量排名
                    </div>
                </template>
                <template #content>
                    <div class="content-container">
                        <Chart :chart-option="salesRankingChartOption" class="chart"></Chart>
                    </div>
                </template>
            </ModelPanel>
        </div>
        <!-- 订单统计 -->
        <ModelPanel class="orderform-statistics-container">
            <template #header>
                <div class="header-container">
                    订单统计
                </div>
            </template>
            <template #content>
                <div class="content-container">
                    <div class="data-container">
                        <div class="data-item" v-for="item in orderformStatisticsDataList" :key="item.dataKey">
                            <div class="data-key">{{ item.dataKey }}</div>
                            <div class="data-value">{{ item.dataValue }}</div>
                        </div>
                    </div>
                    <div class="chart-container">
                        <Chart :chart-option="orderformStatisticsChartOption"></Chart>
                    </div>
                </div>
            </template>
        </ModelPanel>
    </div>
</template>
<script lang="ts" setup>
import { ref } from "vue";
import ModelPanel from "../../components/common/ModePanel.vue"
import Chart from "../../components/common/Chart.vue"
import * as echarts from 'echarts';

// 选中的时间name，默认是昨天
const activeTimeName = ref("yesterday");
// 处理选中时间变化事件
const handleActiveTimeChange = (name: string) => {
    console.log("当前选中的时间名字", name);
}

// 处理数据导出
const handleDataExport = () => {
    console.log("数据导出");
}

// 营业额统计
const turnoverChartOption = ref({
    xAxis: {
        type: 'category',
        data: ['4-1', '4-2', '4-3', '4-4', '4-5', '4-6', '4-7']
    },
    yAxis: {
        type: 'value'
    },
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'cross',
            label: {
                backgroundColor: '#6a7985'
            }
        }
    },
    series: [
        {
            data: [80, 105, 158, 33, 130, 100, 110],
            type: 'line',
            smooth: true,
            itemStyle: {
                color: 'rgb(13, 89, 47)'
            },
            areaStyle: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                    {
                        offset: 0,
                        color: 'rgba(30, 201, 8, 0.5)'
                    },
                    {
                        offset: 1,
                        color: 'rgba(30, 201, 8, 0.1)'
                    }
                ])
            },
            label: {
                show: true,
                color: '#237855', // 设置文本颜色为 #237855
                formatter: function (params: any) {
                    // 判断当前值是否是最高值或最低值
                    if (params.value === Math.max.apply(null, turnoverChartOption.value.series[0].data) ||
                        params.value === Math.min.apply(null, turnoverChartOption.value.series[0].data)) {
                        return params.value; // 显示最高值和最低值的 label
                    } else {
                        return ''; // 其他值不显示 label
                    }
                }
            },
        }
    ],
    grid: {
        top: 20,
        bottom: 20,
        left: 60,
        right: 20,
    }
});
// 用户统计
const userStatisticsChartOption = ref({
    xAxis: {
        type: 'category',
        data: ['4-1', '4-2', '4-3', '4-4', '4-5', '4-6', '4-7']
    },
    yAxis: {
        type: 'value'
    },
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'cross',
            label: {
                backgroundColor: '#6a7985'
            }
        }
    },
    series: [
        {
            data: [526, 762, 1033, 1507, 1667, 1004, 1312],
            type: 'line',
            itemStyle: {
                color: 'rgb(0, 122, 209)'
            },
            areaStyle: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                    {
                        offset: 0,
                        color: 'rgba(0, 122, 209, 0.5)'
                    },
                    {
                        offset: 1,
                        color: 'rgba(220, 247, 225, 0.1)'
                    }
                ])
            },
            label: {
                show: true,
                color: 'rgb(0, 122, 209)', // 设置文本颜色为 rgb(0, 122, 209)
            },
        }
    ],
    grid: {
        top: 20,
        bottom: 20,
        left: 60,
        right: 20,
    }
});
// 销量排名
const salesRankingChartOption = ref({
    xAxis: {
        type: 'value', // 使用 value 类型表示 x 轴
        show: true, // 显示 x 轴线
        axisLine: {
            show: true, // 显示 x 轴线
            lineStyle: {
                type: 'dashed' // 网格线的类型，可以设置为'dashed'、'solid'等
            }
        },
        axisTick: {
            show: false // 不显示刻度
        },
        axisLabel: {
            show: true // 显示标签
        },
        splitLine: {
            show: true, // 显示横向网格线
            lineStyle: {
                type: 'dashed' // 网格线的类型，可以设置为'dashed'、'solid'等
            }
        }
    },
    yAxis: {
        type: 'category', // 使用 category 类型表示 y 轴
        data: ['宫保鸡丁', '西湖醋鱼', '粉蒸肉', '黄金螃蟹'],
        show: true, // 显示 y 轴线
        axisLine: {
            show: true, // 显示 y 轴线
            lineStyle: {
                type: 'dashed' // 网格线的类型，可以设置为'dashed'、'solid'等
            }
        },
        axisTick: {
            show: false // 不显示刻度
        },
        axisLabel: {
            show: true // 显示标签
        },
        splitLine: {
            show: true, // 显示横向网格线
            lineStyle: {
                type: 'dashed' // 网格线的类型，可以设置为'dashed'、'solid'等
            }
        }
    },
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'cross',
            label: {
                backgroundColor: '#6a7985'
            }
        }
    },
    series: [{
        type: 'bar', // 条形图类型
        data: [88, 60, 40, 8],
        label: {
            show: true, // 显示标签
            position: 'right' // 标签位置，可以根据需要调整
        },
        itemStyle: {
            color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 1,
                y2: 0,
                colorStops: [
                    { offset: 0, color: 'rgba(43, 184, 97, 0.80)' },
                    { offset: 0.5261, color: 'rgba(23, 117, 59, 0.80)' },
                    { offset: 1, color: 'rgba(23, 117, 59, 0.80)' }
                ]
            },
            barBorderRadius: [0, 7, 7, 0], // 圆角设置
        },
        barWidth: 20 // 设置条形的宽度
    }],
    grid: {
        top: 16,
        bottom: 20,
        left: "20%",
        right: 20,
    }
});

// 订单统计数据
const orderformStatisticsDataList = ref([
    {
        dataKey: "订单总数 : ",
        dataValue: 120
    },
    {
        dataKey: "有效订单 : ",
        dataValue: 100
    },
    {
        dataKey: "订单完成率 : ",
        dataValue: "83.3%"
    }
])
const orderformStatisticsChartOption = ref({
    legend: {
        data: ['all', 'order'],
    },
    xAxis: {
        type: 'category',
        data: ['4-1', '4-2', '4-3', '4-4', '4-5', '4-6', '4-7']
    },
    yAxis: {
        type: 'value'
    },
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'cross',
            label: {
                backgroundColor: '#6a7985'
            }
        }
    },
    series: [
        {
            name: "order",
            data: [50, 45, 33, 29, 24, 11, 38],
            type: 'line',
            smooth: true,
            itemStyle: {
                color: 'rgb(13, 89, 47)'
            },
            areaStyle: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                    {
                        offset: 0,
                        color: 'rgba(30, 201, 8, 0.5)'
                    },
                    {
                        offset: 1,
                        color: 'rgba(30, 201, 8, 0.1)'
                    }
                ])
            },
            lineStyle: {
                shadowColor: 'rgba(102, 102, 102, 1)', // 阴影颜色
                shadowBlur: 8, // 阴影模糊度
                shadowOffsetY: 5 // 阴影垂直偏移量
            },
            label: {
                show: true,
                color: '#237855', // 设置文本颜色为 #237855
            },
        },
        {
            name: "all",
            data: [88, 65, 52, 54, 95, 70, 89],
            type: 'line',
            smooth: true,
            itemStyle: {
                color: 'rgb(0, 122, 209)'
            },
            lineStyle: {
                shadowColor: 'rgba(102, 102, 102, 1)', // 阴影颜色
                shadowBlur: 8, // 阴影模糊度
                shadowOffsetY: 5 // 阴影垂直偏移量
            },
            areaStyle: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                    {
                        offset: 0,
                        color: 'rgba(0, 122, 209, 0.5)'
                    },
                    {
                        offset: 1,
                        color: 'rgba(220, 247, 225, 0.1)'
                    }
                ])
            },
            label: {
                show: true,
                color: 'rgb(0, 122, 209)', // 设置文本颜色为 rgb(0, 122, 209)
            },
        }
    ],
    grid: {
        top: 20,
        bottom: 20,
        left: 60,
        right: 20,
    }
})
</script>

<style lang="scss" scoped>
.data-statistics-page-container {
    // 时间选择器
    .data-statistics-container {
        .header-container {
            font-size: 32px;
        }
        .content-container {
            position: relative;
            .time-tabs {
                // position: absolute;
            }
            .export-btn {
                position: absolute;
                top: -4px;
                right: 116px;
                border-radius: 13px;
            }
        }
    }
    // 营业额、用户统计、销量排名
    .third-panel-container {
        display: flex;
        & > div {
            width: calc(100% / 3);
            .header-container {
                font-size: 24px;
            }
            .content-container {
                height: 260px;
            }
            .chart {
                height: 260px;
            }
        }
    }
    // 订单统计
    .orderform-statistics-container {
        height: 370px;
        margin-top: 10px;
        .header-container {
            font-size: 24px;
        }
        .content-container {
            .data-container {
                display: flex;
                .data-item {
                    display: flex;
                    margin-right: 20px;
                    .data-key {
                        color: #666666;
                    }
                }
            }
            .chart-container {
                height: 310px;
            }
        }
    }
}
</style>
