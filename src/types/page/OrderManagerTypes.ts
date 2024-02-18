export type GetOrderOption = {
    page: number,
    pageSize: number,
    begineTime: string,
    endTime: string,
    number: string, // 订单号
    phone: string,
    status: number | string
}