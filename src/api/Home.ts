import { apiPrefix, instance } from "."
import { GetOrderInfoOption } from "../types/page/HomeTypes";

/**
 * 获取工作台今日数据
 * @returns 
 * {
        "code": 1,
        "msg": "OK",
        "data": {
            "turnover": 0.0,
            "validOrderCount": 0,
            "orderCompletionRate": 0.0,
            "unitPrice": 0.0,
            "newUsers": 0
        }
    }
 */
export const getTodayData = () => instance.get(`${apiPrefix}/admin/workspace/businessData`);

/**
 * 获取工作台订单管理数据
 * @returns 
 */
export const getOrderManagerData = () => instance.get(`${apiPrefix}/admin/workspace/overviewOrders`);

/**
 * 获取工作台菜品总览数据
 * @returns 
 */
export const getOverviewDishes = () => instance.get(`${apiPrefix}/admin/workspace/overviewDishes`);

/**
 * 获取工作台套餐总览数据
 * @returns 
 */
export const getOverviewSetmeals = () => instance.get(`${apiPrefix}/admin/workspace/overviewSetmeals`);

/**
 * 各个状态的订单数量统计
 * @returns 
 */
export const getPendingOrdersCount = () => instance.get(`${apiPrefix}/admin/order/statistics`);

/**
 * 获取所有订单
 * @returns 
 */
export const getOrderInfo = (option: GetOrderInfoOption) => instance.get(`${apiPrefix}/admin/order/conditionSearch?page=${option.page}&pageSize=${option.pageSize}&status=${option.status}`);

/**
 * 接单
 * @param id 单号的id
 * @returns 
 */
export const jieDan = (id: string) => instance.put(`${apiPrefix}/admin/order/confirm`, {id});

/**
 * 拒单
 * @param id 单号的id
 * @param rejectionReason 拒单原因
 * @returns 
 */
export const juDan = (id: string, rejectionReason: string) => instance.put(`${apiPrefix}/admin/order/rejection`, {id, rejectionReason});

/**
 * 退单
 * @param id 单号的id
 * @param cancelReason 退单原因
 * @returns 
 */
export const tuiDan = (id: string, cancelReason: string) => instance.put(`${apiPrefix}/admin/order/cancel`, {id, cancelReason});

/**
 * 查询订单详细信息
 * @param id 订单id
 * @returns 
 */
export const queryOrderDetailInfo = (id: string) => instance.get(`${apiPrefix}/admin/order/details/${id}`);

// 状态码文字map
export const statusCodeMap = {
    1: "待付款",
    2: "待接单", // 接单、拒单、退单
    3: "已接单",
    4: "派送中",
    5: "已完成",
    6: "已取消"
}