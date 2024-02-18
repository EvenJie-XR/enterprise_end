import { instance } from ".";
import { GetOrderOption } from "../types/page/OrderManagerTypes";

/**
 * 获取订单
 * @param option 查询订单的相关参数
 * @returns 
 */
export const getOrder = (option: GetOrderOption) => instance.get(`/api/admin/order/conditionSearch?page=${option.page}&pageSize=${option.pageSize}&beginTime=${option.begineTime}&endTime=${option.endTime}&number=${option.number}&phone=${option.phone}&status=${option.status}`);
