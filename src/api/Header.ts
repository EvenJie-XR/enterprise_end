import { instance } from "."

/**
 * 获取当前登录账号店铺信息
 * @returns 
 */
export const getShopInfo = () => instance.get("/api/admin/shop/info");

/**
 * 获取店铺当前营业状态
 * @returns 
 */
export const getShopStatus = () => instance.get("/api/admin/shop/status");

export const setShopStatus = (status: number) => instance.put(`/api/admin/shop/${status}`);