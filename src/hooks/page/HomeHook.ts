import { Ref, computed, onUnmounted, ref } from "vue";
import { getOrderInfo, getOrderManagerData, getOverviewDishes, getPendingOrdersCount, getTodayData, jieDan, juDan, queryOrderDetailInfo, tuiDan } from "../../api/Home";
import dayjs from "dayjs"
import { ElMessage } from "element-plus";
import { MessageEventTypeEnum, useMessageHook } from "../messageHook";

/**
 * 今日数据
 * @returns 
 */
export const useTodayData = () => {
    // 今日数据时间字符串
    const todayDateStr = dayjs().format("YYYY.M.D HH:mm");
    // 今日数据模拟数据
    const todayDataList = ref([
        {
            title: "营业额",
            data: "200.34"
        },
        {
            title: "有效订单",
            data: "12"
        },
        {
            title: "订单完成率",
            data: "16%"
        },
        {
            title: "平均客单价",
            data: "30"
        },
        {
            title: "下单用户",
            data: "18"
        }
    ]);

    // 一进来就获取今日数据
    getTodayData().then((res) => {
        if (res.data.code) { // code == 1请求今日数据成功
            const todayData = res.data.data;
            // 营业额
            todayDataList.value[0].data = todayData.turnover;
            // 有效订单
            todayDataList.value[1].data = todayData.validOrderCount;
            // 订单完成率
            todayDataList.value[2].data = todayData.orderCompletionRate + "%";
            // 平均客单价
            todayDataList.value[3].data = todayData.unitPrice;
            // 新增用户数
            todayDataList.value[4].data = todayData.newUsers;
        }
    })
    return {
        todayDateStr,
        todayDataList
    }
}

/**
 * 订单管理
 * @returns 
 */
export const useOrderManager = () => {
    // 菜单套餐总览模拟数据
    const orderformDataList = ref([
        {
            title: "待接单",
            data: "12",
            backgroundColor: "#ff8000"
        },
        {
            title: "待派送",
            data: "10",
            backgroundColor: "#ff8000"
        },
        {
            title: "已完成",
            data: "18",
            backgroundColor: "#28A767"
        },
        {
            title: "已取消",
            data: "1",
            backgroundColor: "#28A767"
        },
        {
            title: "全部订单",
            data: "41",
            backgroundColor: "#28A767"
        }
    ])

    /**
     * 一进来就获取订单管理数据
     */
    getOrderManagerData().then((res) => {
        if (res.data.code) { // code == 1获取订单管理数据成功
            const data = res.data.data;
            // 待接单
            orderformDataList.value[0].data = data.waitingOrders;
            // 待派送
            orderformDataList.value[1].data = data.deliveredOrders;
            // 已完成
            orderformDataList.value[2].data = data.completedOrders;
            // 已取消
            orderformDataList.value[3].data = data.cancelledOrders;
            // 全部订单
            orderformDataList.value[4].data = data.allOrders;
        }
    })
    return {
        orderformDataList
    }
}

/**
 * 菜品总览
 * @returns 
 */
export const useOverviewDishes = () => {
    /**
     * 菜品总览数据
     */
    const overviewDishes = ref({
        discontinued: 2,
        sold: 12
    })

    /**
     * 一进来就获取菜品总览的数据
     */
    getOverviewDishes().then((res) => {
        if (res.data.code) { // code == 1请求菜品总览数据成功
            const data = res.data.data;
            overviewDishes.value.sold = data.sold;
            overviewDishes.value.discontinued = data.discontinued;
        }
    })
    return {
        overviewDishes
    }
}

/**
 * 订单信息
 * @returns 
 */
export const useOrderInfo = () => {
    // 订单信息模拟数据
    const tableData = ref([])
    // 默认的pagesize
    const pageSize = ref(10);
    // 当前页数
    const currentPage = ref(1);
    // 确认对话框是否可视
    const jieDanConfirmDialogVisible = ref(false);
    // 总数
    const total = ref(100);
    // 当前操作的订单编号
    const currentRow: Ref<any> = ref();
    // 拒单对话框是否可视
    const juDanDialogVisible = ref(false);
    // 退单对话框是否可视
    const tuiDanDialogVisible = ref(false);
    // 订单信息对话框是否可视
    const orderInfoDialogVisible = ref(false);
    // 订单详细信息
    const orderDetailInfo: Ref<any> = ref();
    // 待接单数量
    const pendingOrdersCount = ref(0);
    // 待派送数量
    const toBeDeliveredCount = ref(0);
    const currentActiveName = ref('');
    // 用于请求的status
    const queryStatus = computed(() => {
        if(currentActiveName.value)
            return currentActiveName.value  === "pending-order" ? 2 : 3
        return '';
    })

    // 处理实时接收消息相关逻辑-------------------------------------------------------------------------
    const useMessageHookInstance = useMessageHook();
    // 如果有新的订单来了就更新表格
    const offNewOrderListener = useMessageHookInstance.addEventListener(() => {
        console.log("有新订单了更新工作台订单表格");
        getNewOrderInfo()
    }, MessageEventTypeEnum.newOrder)
    const offCancelOrderListener = useMessageHookInstance.addEventListener(() => {
        console.log("有用户取消订单了更新工作台订单表格");
        getNewOrderInfo()
    }, MessageEventTypeEnum.cancelOrder)
    // 页面销毁时取消监听函数
    onUnmounted(() => {
        offNewOrderListener();
        offCancelOrderListener();
    })
    // -----------------------------------------------------------------------------------------------

    /**
     * 处理订单状态选择按钮激活状态变化事件
     * @param activeName 订单状态激活状态字符串
     */
    const handleOrderStatusSwitchChange = (activeName: string) => {
        console.log("订单状态选择按钮激活状态变化了", activeName);
        currentActiveName.value = activeName;
        getNewOrderInfo();
    }
    /**
     * 获取订单信息接口
     */
    const getNewOrderInfo = () => {
        getOrderInfo({
            page: currentPage.value,
            pageSize: pageSize.value,
            status: queryStatus.value
        }).then((res) => {
            if(res.data.code) {
                tableData.value = res.data.data.records;
                total.value = res.data.data.total;
            }
        })
        getPendingOrdersCount().then((res) => {
            if(res.data.code) { // code == 1 获取各个状态的订单数量统计成功
                const data = res.data.data;
                // 待接单数量
                pendingOrdersCount.value = data.toBeConfirmed;
                // 待派送数量
                toBeDeliveredCount.value = data.confirmed;
            }
        })
    }
    // 获取一进来的订单信息接口
    getNewOrderInfo();
    /**
     * 当currentpage或者pagesize变化的时候触发
     */
    const onCurrentPageOrPageSizeChange = () => {
        getNewOrderInfo();
    }
    /**
     * 接单按钮点击事件
     * @param row 当前订单数据
     */
    const onJieDanBtnClick = (row: any) => {
        jieDanConfirmDialogVisible.value = true;
        currentRow.value = row;
    }
    /**
     * 再次确认接单按钮点击事件
     */
    const onConfirmJieDanBtnClick = () => {
        jieDan(currentRow.value.id).then((res) => {
            if(res.data.code) {
                ElMessage({
                    message: "接单成功",
                    type: "success"
                });
                jieDanConfirmDialogVisible.value = false;
                getNewOrderInfo();
            }else {
                ElMessage({
                    message: "接单失败",
                    type: "error"
                })
            }
        });
    }
    /**
     * 拒单按钮点击事件
     * @param row 当前订单数据
     */
    const onJuDanBtnClick = (row: any) => {
        juDanDialogVisible.value = true;
        currentRow.value = row;
    }
    /**
     * 再次确认拒单按钮点击事件
     */
    const onConfirmJuDanBtnClick = (juDanReason: string) => {
        juDan(currentRow.value.id, juDanReason).then((res) => {
            if(res.data.code) {
                ElMessage({
                    message: "拒单成功",
                    type: "success"
                })
                juDanDialogVisible.value = false;
                getNewOrderInfo();
            } else {
                ElMessage({
                    message: "拒单失败",
                    type: "error"
                })
            }
        });
    }
    /**
     * 退单按钮点击事件
     * @param row 当前订单数据
     */
    const onTuiDanBtnClick = (row: any) => {
        tuiDanDialogVisible.value = true;
        currentRow.value = row;
    }
    /**
     * 再次确认退单按钮点击事件
     * @param tuiDanReason 退单原因
     */
    const onConfirmTuiDanBtnClick = (tuiDanReason: string) => {
        tuiDan(currentRow.value.id, tuiDanReason).then((res) => {
            if(res.data.code) {
                ElMessage({
                    message: "退单成功",
                    type: "success"
                })
                tuiDanDialogVisible.value = false;
                getNewOrderInfo();
            } else {
                ElMessage({
                    message: "退单失败",
                    type: "error"
                })
            }
        });
    }
    /**
     * 当查看按钮点击
     * @param row 当前行的订单信息
     */
    const onChaKanBtnClick = (row: any) => {
        orderInfoDialogVisible.value = true;
        currentRow.value = row;
        // 获取当前订单的详细信息
        queryOrderDetailInfo(currentRow.value.id)
        .then((res) => {
            if(res.data.code) {
                orderDetailInfo.value = res.data.data;
            } else {
                ElMessage({
                    message: "获取订单详细信息失败",
                    type: "error"
                })
            }
        })
        .catch(() => {
            ElMessage({
                message: "获取订单详细信息失败",
                type: "error"
            })
        })
    }
    return {
        tableData,
        handleOrderStatusSwitchChange,
        pageSize,
        currentPage,
        total,
        onCurrentPageOrPageSizeChange,
        jieDanConfirmDialogVisible,
        onJieDanBtnClick,
        onConfirmJieDanBtnClick,
        juDanDialogVisible,
        onJuDanBtnClick,
        tuiDanDialogVisible,
        onTuiDanBtnClick,
        onConfirmJuDanBtnClick,
        onConfirmTuiDanBtnClick,
        orderInfoDialogVisible,
        onChaKanBtnClick,
        orderDetailInfo,
        pendingOrdersCount,
        toBeDeliveredCount,
    }
}
