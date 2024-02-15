import { Ref } from "vue"

// 营业额统计图表数据
export type TurnoverChartDataType = Ref<{
    dateList: string[],
    turnoverList: number[]
}>

// 用户统计图表数据
export type UserStatisticsChartDataType = Ref<{
    dateList: string[],
    turnoverList: number[]
}>

// 销量排名统计图表数据
export type SalesRankingChartDataType = Ref<{
    foodList: string[],
    salesRankingList: number[]
}>

// 订单统计图表上面的三个统计数据
export type OrderformStatisticsDataListType = Ref<({
    dataKey: string;
    dataValue: number;
} | {
    dataKey: string;
    dataValue: string;
})[]>

// 订单统计图表数据
export type OrderformStatisticsChartDataType = Ref<{
    dateList: string[];
    validOrderCountList: number[];
    orderCountList: number[];
}>