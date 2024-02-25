import { Ref, computed, onMounted, onUnmounted, ref } from "vue";
import { getOrder } from "../../api/OrderManager";
import * as dayjs from "dayjs"
import { jieDan, juDan, queryOrderDetailInfo, tuiDan } from "../../api/Home";
import { ElMessage } from "element-plus";
import { MessageEventTypeEnum, useMessageHook } from "../messageHook";

/**
 * 表格部分
 * @returns 
 */
const useTable = () => {
    const tableData: Ref<any> = ref([]);
    // 接单确认弹窗可视性
    const jieDanConfirmDialogVisible = ref(false);
    // 当前选中的行
    const currentRow: Ref<any> = ref();
    // 拒单确认弹窗可视性
    const juDanConfirmDialogVisible = ref(false);
    // 取消确认弹窗可视性
    const cancelConfirmDialogVisible = ref(false);
    // 查看详情信息确认弹窗可视性
    const viewDetailConfirmDialogVisible = ref(false);
    // 详细订单信息
    const detailOrderInfo: Ref<any> = ref();
    /**
     * 当表格的接单按钮点击了
     */
    const onTableJieDanBtnClick = (row: any) => {
        jieDanConfirmDialogVisible.value = true;
        currentRow.value = row;
    }
    /**
     * 当表格的拒单按钮点击事件
     */
    const onTableJuDanBtnClick = (row: any) => {
        juDanConfirmDialogVisible.value = true;
        currentRow.value = row;
    }
    /**
     * 当表格的取消按钮点击事件
     * @param row 
     */
    const onTableCancelBtnClick = (row: any) => {
        cancelConfirmDialogVisible.value = true;
        currentRow.value = row;
    }
    /**
     * 当表格的查看按钮点击事件
     * @param row 
     */
    const onTableViewDeatilBtnClick = (row: any) => {
        viewDetailConfirmDialogVisible.value = true;
        currentRow.value = row;
        queryOrderDetailInfo(currentRow.value.id).then((res) => {
            if(res.data.code) {
                detailOrderInfo.value = res.data.data;
            } else {
                ElMessage({
                    message: "获取订单信息失败",
                    type: "error"
                })
            }
        })
    }
    return {
        tableData,
        jieDanConfirmDialogVisible,
        onTableJieDanBtnClick,
        juDanConfirmDialogVisible,
        onTableJuDanBtnClick,
        currentRow,
        cancelConfirmDialogVisible,
        onTableCancelBtnClick,
        viewDetailConfirmDialogVisible,
        onTableViewDeatilBtnClick,
        detailOrderInfo
    }
}

/**
 * 订单状态选择器
 * @param tableData 
 * @returns 
 */
const useOrderStatusSwitch = () => {
    // 激活的分类名称
    const activeCategoryName = ref(0);
    return {
        activeCategoryName
    }
}

/**
 * 查询订单
 * @returns 
 */
const useQueryOrder = () => {
    // 订单号
    const no = ref("");
    // 手机号
    const phone = ref("");
    // 下单时间
    const orderTime: Ref<Date[] | undefined> = ref();
    // 格式化下单时间用于接口请求
    const formatOrderTime = computed(() => {
        if(orderTime.value) {
            const begineTime = dayjs(orderTime.value[0]).format("YYYY-MM-DD HH:mm:ss");
            const endTime = dayjs(orderTime.value[1]).format("YYYY-MM-DD HH:mm:ss");
            return {
                begineTime,
                endTime
            }
        } else {
            return "";
        }
    })
    const reset = () => {
        no.value = '';
        phone.value = '';
        orderTime.value = undefined;
    }
    return {
        no,
        phone,
        orderTime,
        formatOrderTime,
        reset
    }
}

/**
 * 分页相关
 * @returns 
 */
const usePagination = () => {
    const currentPage = ref(1); // 当前页码
    const pageSize = ref(10); // 每页多少条数据
    const total = ref(0); // 数据的总条数

    return {
        currentPage,
        pageSize,
        total
    }
}

/**
 * 订单
 * @returns 
 */
export const useOrderformManager = () => {
    // 表格部分
    const { tableData, jieDanConfirmDialogVisible, onTableJieDanBtnClick, currentRow, juDanConfirmDialogVisible, onTableJuDanBtnClick, cancelConfirmDialogVisible, onTableCancelBtnClick, viewDetailConfirmDialogVisible, onTableViewDeatilBtnClick, detailOrderInfo } = useTable();

    // 查询订单
    const { no, phone, orderTime, formatOrderTime, reset } = useQueryOrder();

    // 订单状态选择部分
    const { activeCategoryName } = useOrderStatusSwitch();

    // 分页相关
    const { currentPage, pageSize, total } = usePagination();

    onMounted(() => {
        updateTableData();
    })

    // ------------------处理实时消息相关逻辑---------------------------------------------------------
    const useMessageHookInstance = useMessageHook();
    // 如果有新的订单来了就更新表格
    const offNewOrderListener = useMessageHookInstance.addEventListener(() => {
        console.log("有新订单了更新订单管理订单表格");
        updateTableData()
    }, MessageEventTypeEnum.newOrder)
    const offCancelOrderListener = useMessageHookInstance.addEventListener(() => {
        console.log("有用户取消订单了更新订单管理订单表格");
        updateTableData()
    }, MessageEventTypeEnum.cancelOrder)
    // 页面销毁时取消监听函数
    onUnmounted(() => {
        offNewOrderListener();
        offCancelOrderListener();
    })
    // ---------------------------------------------------------------------------------------------

    /**
     * 更新表格数据
     */
    const updateTableData = () => {
        getOrder({
            page: currentPage.value,
            pageSize: pageSize.value,
            begineTime: formatOrderTime.value ? formatOrderTime.value.begineTime : "",
            endTime: formatOrderTime.value ? formatOrderTime.value.endTime : "",
            number: no.value,
            phone: phone.value,
            status: activeCategoryName.value ? activeCategoryName.value : ""
        }).then((res) => {
            if(res.data.code) {
                tableData.value = res.data.data.records;
                total.value = res.data.data.total;
            }
        })
    }

    /**
     * 分页组件的change事件
     */
    const onPaginationChange = () => {
        updateTableData();
    }

    /**
     * 当激活订单状态切换
     */
    const handleActiveCategoryNameChange = () => {
        updateTableData();
    }

    /**
     * 当接单的确认接单按钮点击了 调用接单接口
     */
    const onJieDanConfirmBtnClick = () => {
        jieDan(currentRow.value.id).then((res) => {
            console.log(res);
            if(res.data.code) {
                ElMessage({
                    message: "接单成功",
                    type: "success"
                })
                jieDanConfirmDialogVisible.value = false;
                updateTableData();
            } else {
                ElMessage({
                    message: "接单失败",
                    type: "error"
                })
            }
        });
    }

    /**
     * 当拒单的确认拒单按钮点击了 调用拒单接口
     * @param reason 
     */
    const onJuDanConfirmBtnClick = (reason: string) => {
        juDan(currentRow.value.id, reason).then((res) => {
            if(res.data.code) {
                ElMessage({
                    message: "拒单成功",
                    type: "success"
                })
                juDanConfirmDialogVisible.value = false;
                updateTableData();
            } else {
                ElMessage({
                    message: "拒单失败",
                    type: "error"
                })
            }
        })
    }

    /**
     * 当取消的确认取消按钮点击了 调用取消接口
     * @param reason 
     */
    const onCancelConfirmBtnClick = (reason: string) => {
        tuiDan(currentRow.value.id, reason).then((res) => {
            if(res.data.code) {
                ElMessage({
                    message: "取消成功",
                    type: "success"
                })
                cancelConfirmDialogVisible.value = false;
                updateTableData();
            } else {
                ElMessage({
                    message: "取消失败",
                    type: "error"
                })
            }
        })
    }

    return {
        tableData, jieDanConfirmDialogVisible, onTableJieDanBtnClick, onJieDanConfirmBtnClick, juDanConfirmDialogVisible, onTableJuDanBtnClick, cancelConfirmDialogVisible, onTableCancelBtnClick, viewDetailConfirmDialogVisible, onTableViewDeatilBtnClick, detailOrderInfo, // 表格部分
        no, phone, orderTime, reset, // 查询订单部分
        activeCategoryName, // 订单状态选择部分
        currentPage, pageSize, total, // 分页部分
        updateTableData, onPaginationChange, handleActiveCategoryNameChange, onJuDanConfirmBtnClick, onCancelConfirmBtnClick // 一些全局的方法
    }
}