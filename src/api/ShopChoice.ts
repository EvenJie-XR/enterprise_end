import { apiPrefix, instance } from ".";
import type { ShopApplicationType } from '../types/ShopChoiceTypes'
/**
 *  获取我的绑定的店铺列表
 *  @returns 
 */
export const getShopList = () => instance.get(`${apiPrefix}/admin/employee/list`);
/**
 *  选择店铺
 *  @param shopId 店铺id
 *  @returns object 
 */
export const choseShop = (shopId: string) => instance.post(`${apiPrefix}/admin/employee/select/${shopId}`);
/**
 *  解绑店铺
 *  @param shopId 店铺id
 */
export const removeShop = (shopId: string) => instance.post(`${apiPrefix}/admin/employee/unbind/${shopId}`);
/**
 *  绑定店铺
 *  @param account 通过审核的店铺账户
 *  @param password 通过审核的店铺账户密码
 */
export const addShop = (account: string, password: string) => instance.put(`${apiPrefix}/admin/employee/bind`, {
    account,
    password
});
/**
 *  商家入驻（商家提起创建店铺请求）
 *  @param option {
 *  name:店铺名称,
 *  shopImage:店铺照片路径,
 *  certificate:社会信用代码证书照片路径,
 *  legalPersonName:法人姓名,
 *  idNumber:身份证号
 *  phone:手机号
 * }
 */
export const newShop = (option: ShopApplicationType) => instance.post(`${apiPrefix}/admin/employee/add`, {
    name: option.name,
    shopImage: option.shopImage,
    certificate: option.certificate,
    legalPersonName: option.legalPersonName,
    idNumber: option.idNumber,
    phone: option.phone,
    account: option.account,
    password: option.password
});
