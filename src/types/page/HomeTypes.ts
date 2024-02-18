/**
 * 获取订单信息接口的参数类型
 */
export type GetOrderInfoOption = {
    page: number,
    pageSize: number,
    status: number | string
}