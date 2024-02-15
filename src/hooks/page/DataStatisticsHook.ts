import * as echarts from 'echarts';
import { exportData, getOrdersStatistics, getTop10, getTurnoverStatistics, getUserStatistics } from "../../api/DataStatistics";
import { computed, onMounted, ref } from 'vue';
import dayjs from "dayjs";
import { OrderformStatisticsChartDataType, OrderformStatisticsDataListType, SalesRankingChartDataType, TurnoverChartDataType, UserStatisticsChartDataType } from '../../types/page/DataStatisticsTypes';

/**
 * 导出数据
 * @returns 
 */
export const useExportData = () => {
    /**
     * 自动下载zip文件
     * @param url 文件url
     * @param fileName 文件名字
     */
    const downloadZipFile = () => {
        exportData().then((res) => {
            const url = URL.createObjectURL(new Blob([res.data]));
            const fileName = "数据导出.zip";

            var link = document.createElement("a");
            link.href = url;
            link.download = fileName;
            link.style.display = "none";
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        })
    }
    return {
        downloadZipFile
    }
}

/**
 * 激活时间
 * @returns 
 */
export const useActiveTime = (turnoverChartData: TurnoverChartDataType, userStatisticsChartData: UserStatisticsChartDataType, salesRankingChartData: SalesRankingChartDataType, orderformStatisticsDataList: OrderformStatisticsDataListType, orderformStatisticsChartData: OrderformStatisticsChartDataType) => {
    // 选中的时间name，默认是昨天
    const activeTimeName = ref("yesterday");

    /**
     * 通过激活时间获取起始日期和截至日期
     * @param activeName 激活时间
     */
    const getBegineTimeAndEndTimeByActiveTime = (activeName: string) => {
        switch (activeName) {
            case "yesterday":
                return {
                    begineTimeStr: dayjs().subtract(1, "day").format("YYYY-MM-DD"),
                    endTimeStr: dayjs().format("YYYY-MM-DD")
                }
            case "last7days":
                return {
                    begineTimeStr: dayjs().subtract(7, "day").format("YYYY-MM-DD"),
                    endTimeStr: dayjs().format("YYYY-MM-DD")
                }
            case "last30days":
                return {
                    begineTimeStr: dayjs().subtract(30, "day").format("YYYY-MM-DD"),
                    endTimeStr: dayjs().format("YYYY-MM-DD")
                }
            case "week":
                return {
                    begineTimeStr: dayjs().startOf('week').format('YYYY-MM-DD'),
                    endTimeStr: dayjs().endOf('week').format('YYYY-MM-DD')
                }
            case "month":
                return {
                    begineTimeStr: dayjs().startOf('month').format('YYYY-MM-DD'),
                    endTimeStr: dayjs().endOf('month').format('YYYY-MM-DD')
                }
            default:
                return {
                    begineTimeStr: "activeName异常",
                    endTimeStr: "activeName异常"
                }
        }
    }
    /**
     * 更新图表数据
     * @param activeName 激活的时间范围字符串
     */
    const handleUpdateChatData = (activeName: string) => {
        const begineTimeAndEndTimeObj = getBegineTimeAndEndTimeByActiveTime(activeName);
        // 获取营业额统计数据
        getTurnoverStatistics(begineTimeAndEndTimeObj.begineTimeStr, begineTimeAndEndTimeObj.endTimeStr).then((res) => {
            if (res.data.code) { // code == 1获取营业额统计数据OK
                const data = res.data.data;
                const dateListStr: string = data.dateList;
                const turnoverListStr: string = data.turnoverList;
                turnoverChartData.value.dateList = dateListStr.split(",");
                turnoverChartData.value.turnoverList = turnoverListStr.split(",").map((item) => +item);
            }
        })

        // 获取用户统计数据
        getUserStatistics(begineTimeAndEndTimeObj.begineTimeStr, begineTimeAndEndTimeObj.endTimeStr).then((res) => {
            if (res.data.code) {
                const data = res.data.data;
                const dateListStr: string = data.dateList;
                const totalUserListStr: string = data.totalUserList;
                userStatisticsChartData.value.dateList = dateListStr.split(",");
                userStatisticsChartData.value.turnoverList = totalUserListStr.split(",").map((item) => +item);
            }
        })

        // 获取销量top10的食物
        getTop10(begineTimeAndEndTimeObj.begineTimeStr, begineTimeAndEndTimeObj.endTimeStr).then((res) => {
            if (res.data.code) {
                const data = res.data.data;
                const nameListStr: string = data.nameList;
                const numberListStr: string = data.numberList;
                salesRankingChartData.value.foodList = nameListStr.split(",");
                salesRankingChartData.value.salesRankingList = numberListStr.split(",").map((item) => +item);
            }
        })

        // 获取订单统计数据
        getOrdersStatistics(begineTimeAndEndTimeObj.begineTimeStr, begineTimeAndEndTimeObj.endTimeStr).then((res) => {
            if (res.data.code) {
                const data = res.data.data;
                console.log(data);
                // 订单总数
                orderformStatisticsDataList.value[0].dataValue = data.totalOrderCount;
                // 有效订单
                orderformStatisticsDataList.value[1].dataValue = data.validOrderCount;
                // 订单完成率
                orderformStatisticsDataList.value[2].dataValue = data.orderCompletionRate + "%";
                const dateListStr: string = data.dateList;
                const orderCountListStr: string = data.orderCountList;
                const validOrderCountListStr: string = data.validOrderCountList;
                orderformStatisticsChartData.value.dateList = dateListStr.split(",");
                orderformStatisticsChartData.value.orderCountList = orderCountListStr.split(",").map((item) => +item);
                orderformStatisticsChartData.value.validOrderCountList = validOrderCountListStr.split(",").map((item) => +item);
            }
        })
    }
    /**
     * 默认的数据显示
     */
    onMounted(() => {
        handleUpdateChatData(activeTimeName.value);
    })
    // 处理选中时间变化事件
    const handleActiveTimeChange = (name: string) => {
        handleUpdateChatData(name);
    }
    return {
        activeTimeName,
        handleActiveTimeChange
    }
}

/**
 * 营业额统计图表
 * @returns 
 */
export const useTurnoverChart = () => {
    // 营业额统计图表数据
    const turnoverChartData: TurnoverChartDataType = ref({
        dateList: ['4-1', '4-2', '4-3', '4-4', '4-5', '4-6', '4-7'],
        turnoverList: [80, 105, 158, 33, 130, 100, 110]
    })
    // 营业额统计图表配置
    const turnoverChartOption = computed(() => {
        return {
            xAxis: {
                type: 'category',
                data: turnoverChartData.value.dateList
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
                    data: turnoverChartData.value.turnoverList,
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
        }
    });
    return {
        turnoverChartData,
        turnoverChartOption
    }
}

/**
 * 用户统计图表
 * @returns 
 */
export const useUserStatisticsChart = () => {
    const userStatisticsChartData: UserStatisticsChartDataType = ref({
        dateList: ['4-1', '4-2', '4-3', '4-4', '4-5', '4-6', '4-7'],
        turnoverList: [526, 762, 1033, 1507, 1667, 1004, 1312]
    })
    // 用户统计图表配置
    const userStatisticsChartOption = computed(() => {
        return {
            xAxis: {
                type: 'category',
                data: userStatisticsChartData.value.dateList
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
                    data: userStatisticsChartData.value.turnoverList,
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
        }
    });
    return {
        userStatisticsChartData,
        userStatisticsChartOption
    }
}

/**
 * 销量排名
 * @returns 
 */
export const useSalesRankingChart = () => {
    const salesRankingChartData: SalesRankingChartDataType = ref({
        foodList: ['宫保鸡丁', '西湖醋鱼', '粉蒸肉', '黄金螃蟹'],
        salesRankingList: [88, 60, 40, 8]
    })
    // 销量排名图表配置
    const salesRankingChartOption = computed(() => {
        return {
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
                data: salesRankingChartData.value.foodList,
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
                data: salesRankingChartData.value.salesRankingList,
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
        }
    });
    return {
        salesRankingChartData,
        salesRankingChartOption
    }
}

/**
 * 订单统计
 * @returns 
 */
export const useOrderformStatistics = () => {
    // 订单统计数据
    const orderformStatisticsDataList: OrderformStatisticsDataListType = ref([
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
    const orderformStatisticsChartData: OrderformStatisticsChartDataType = ref({
        dateList: ['4-1', '4-2', '4-3', '4-4', '4-5', '4-6', '4-7'],
        validOrderCountList: [50, 45, 33, 29, 24, 11, 38],
        orderCountList: [88, 65, 52, 54, 95, 70, 89]
    })
    // 订单统计图表配置
    const orderformStatisticsChartOption = computed(() => {
        return {
            legend: {
                data: ['订单总数', '有效订单数'],
            },
            xAxis: {
                type: 'category',
                data: orderformStatisticsChartData.value.dateList
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
                    name: "有效订单数",
                    data: orderformStatisticsChartData.value.validOrderCountList,
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
                    name: "订单总数",
                    data: orderformStatisticsChartData.value.orderCountList,
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
        }
    });
    return {
        orderformStatisticsDataList,
        orderformStatisticsChartData,
        orderformStatisticsChartOption
    }
}