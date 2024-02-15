import { instance } from "."

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
export const getTodayData = () => instance.get("/api/admin/workspace/businessData");

/**
 * 获取工作台订单管理数据
 * @returns 
 */
export const getOrderManagerData = () => instance.get("/api/admin/workspace/overviewOrders");

/**
 * 获取工作台菜品总览数据
 * @returns 
 */
export const getOverviewDishes = () => instance.get("/api/admin/workspace/overviewDishes");

/**
 * 获取工作台套餐总览数据
 * @returns 
 */
export const getOverviewSetmeals = () => instance.get("/api/admin/workspace/overviewSetmeals");

export const getPendingOrdersCount = () => {
    
}