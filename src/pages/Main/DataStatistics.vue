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
                    <el-button type="primary" color="#389E79" class="export-btn" size="large"
                        @click="downloadZipFile">数据导出</el-button>
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
import ModelPanel from "../../components/common/ModePanel.vue"
import Chart from "../../components/common/Chart.vue"
import { useActiveTime, useExportData, useOrderformStatistics, useSalesRankingChart, useTurnoverChart, useUserStatisticsChart } from "../../hooks/page/DataStatisticsHook"




// 数据导出
const { downloadZipFile } = useExportData();

// 营业额统计图表
const { turnoverChartData, turnoverChartOption } = useTurnoverChart();

// 用户统计图表
const { userStatisticsChartData, userStatisticsChartOption } = useUserStatisticsChart();

// 销量排名
const { salesRankingChartData, salesRankingChartOption } = useSalesRankingChart();

// 订单统计
const { orderformStatisticsChartData, orderformStatisticsChartOption, orderformStatisticsDataList } = useOrderformStatistics();

// 激活时间
const { activeTimeName, handleActiveTimeChange } = useActiveTime(turnoverChartData, userStatisticsChartData, salesRankingChartData, orderformStatisticsDataList, orderformStatisticsChartData);
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

        &>div {
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
