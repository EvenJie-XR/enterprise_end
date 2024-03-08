import { apiPrefix, instance } from "."

/**
 * 获取当前登录账号店铺信息
 * @returns 
 */
export const getShopInfo = () => instance.get(`${apiPrefix}/admin/shop/info`);

/**
 * 获取店铺当前营业状态
 * @returns 
 */
export const getShopStatus = () => instance.get(`${apiPrefix}/admin/shop/status`);

export const setShopStatus = (status: number) => instance.put(`${apiPrefix}/admin/shop/${status}`);

/**
 * 获取自动接单状态
 * @returns 
 */
export const getAutoOrderTakingStatus = () => instance.get(`${apiPrefix}/admin/shop/isAutoOrderTaking`);

/**
 * 设置自定接单状态
 * @param isAutoOrderTaking 自动接单？
 * @returns 
 */
export const setAutoOrderTakingStatus = (isAutoOrderTaking: boolean) => instance.put(`${apiPrefix}/admin/shop/autoOrderTaking/${isAutoOrderTaking}`);

/**
 * 获取店铺打印机列表信息
 * @returns 
 */
export const getPrintOrderDevicesInfo = () => instance.get(`${apiPrefix}/admin/printer`);

/**
 * 添加打印设备
 * @param option 打印设备信息
 * @returns 
 */
export const addPrintOrderDevice = (option: {
    printerId: string, // 设备编号
    key: string, // 设备识别码
    remark: string, // 设备备注
    phoneNum: string // 流量卡号码
}) => instance.post(`${apiPrefix}/admin/printer?printerId=${option.printerId}&key=${option.key}&phoneNum=${option.phoneNum}&remark=${option.remark}`);

/**
 * 删除打印机设备
 */
export const deletePrintOrderDevice = (printerId: string) => instance.delete(`${apiPrefix}/admin/printer?printerId=${printerId}`);

/**
 * 修改打印机设备信息
 * @param option 修改的信息
 * @returns 
 */
export const editPrintOrderDevice = (option: {
    printerId: string,
    remark: string,
    phoneNum: string
}) => instance.put(`${apiPrefix}/admin/printer?printerId=${option.printerId}&phoneNum=${option.phoneNum}&remark=${option.remark}`);

/**
 * 查询店铺历史消息
 * @param shopId 店铺id
 * @returns 
 */
export const queryShopHistoryMessage = (shopId: number) => instance.get(`${apiPrefix}/admin/shopMessage/list?shopId=${shopId}`);

/**
 * 保存店铺头像和名字
 * @param name 名字
 * @param image 头像
 * @returns 
 */
export const saveShopAvatarAndName = (name: string, image: string) => instance.put(`${apiPrefix}/admin/shop/info?name=${name}&image=${image}`);

export const editPassword = (newPassword: string, oldPassword: string) => instance.put(`${apiPrefix}/admin/employee/editPassword`, {
    newPassword,
    oldPassword
})