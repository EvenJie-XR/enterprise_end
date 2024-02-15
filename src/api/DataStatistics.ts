import { instance } from ".";

/**
 * 获取营业额统计图表数据
 * @returns 
 */
export const getTurnoverStatistics = (begineTime: string, endTime: string) => instance.get(`/api/admin/report/turnoverStatistics?begin=${begineTime}&end=${endTime}`);

/**
 * 获取订单统计图表数据
 * @returns 
 */
export const getOrdersStatistics = (begineTime: string, endTime: string) => instance.get(`/api/admin/report/ordersStatistics?begin=${begineTime}&end=${endTime}`);

/**
 * 获取销量TOP10图表数据
 * @returns 
 */
export const getTop10 = (begineTime: string, endTime: string) => instance.get(`/api/admin/report/top10?begin=${begineTime}&end=${endTime}`);

/**
 * 获取订单统计图表数据
 * @returns 
 */
export const getUserStatistics = (begineTime: string, endTime: string) => instance.get(`/api/admin/report/userStatistics?begin=${begineTime}&end=${endTime}`);

/**
 * 导出数据
 * @returns 
 */
export const exportData = () => instance.get("/api/admin/report/export");