import { ref } from "vue";
import { getOrderManagerData, getOverviewDishes, getOverviewSetmeals, getTodayData } from "../../api/Home";
import * as dayjs from "dayjs"

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
            title: "新增用户",
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
 * 套餐总览
 * @returns 
 */
export const useOverviewSetmeals = () => {
    /**
     * 套餐总览数据
     */
    const overviewSetmeals = ref({
        discontinued: 2,
        sold: 12
    })

    /**
     * 一进来就获取套餐总览数据
     */
    getOverviewSetmeals().then((res) => {
        if (res.data.code) { // code == 1请求菜品总览数据成功
            const data = res.data.data;
            overviewSetmeals.value.sold = data.sold;
            overviewSetmeals.value.discontinued = data.discontinued;
        }
    })
    return {
        overviewSetmeals
    }
}

/**
 * 订单信息
 * @returns 
 */
export const useOrderInfo = () => {
    // 订单信息模拟数据
    const tableData = ref([
        {
            no: 2021010200001,
            name: "宫保鸡丁*1 红烧带鱼*1 农家小炒肉*2",
            sendState: "派送中",
            address: "金燕楼办公楼（建材城西路九号）四层--宾馆北侧办公室",
            time: "2021-01-02 11：11：11",
            money: "40.00",
            notes: "不要香菜",
        },
        {
            no: 2021010200001,
            name: "宫保鸡丁*1 红烧带鱼*1 农家小炒肉*2",
            sendState: "派送中",
            address: "金燕楼办公楼（建材城西路九号）四层--宾馆北侧办公室",
            time: "2021-01-02 11：11：11",
            money: "40.00",
            notes: "不要香菜",
        },
        {
            no: 2021010200001,
            name: "宫保鸡丁*1 红烧带鱼*1 农家小炒肉*2",
            sendState: "待派送",
            address: "金燕楼办公楼（建材城西路九号）四层--宾馆北侧办公室",
            time: "2021-01-02 11：11：11",
            money: "40.00",
        },
        {
            no: 2021010200001,
            name: "宫保鸡丁*1 红烧带鱼*1 农家小炒肉*2",
            sendState: "派送中",
            address: "金燕楼办公楼（建材城西路九号）四层--宾馆北侧办公室",
            time: "2021-01-02 11：11：11",
            money: "40.00",
        },
        {
            no: 2021010200001,
            name: "宫保鸡丁*1 红烧带鱼*1 农家小炒肉*2",
            sendState: "派送中",
            address: "金燕楼办公楼（建材城西路九号）四层--宾馆北侧办公室",
            time: "2021-01-02 11：11：11",
            money: "40.00",
            notes: "不要香菜",
        }
    ])
    /**
     * 处理订单状态选择按钮激活状态变化事件
     * @param activeName 订单状态激活状态字符串
     */
    const handleOrderStatusSwitchChange = (activeName: string) => {
        console.log("订单状态选择按钮激活状态变化了", activeName);
    }
    return {
        tableData,
        handleOrderStatusSwitchChange
    }
}