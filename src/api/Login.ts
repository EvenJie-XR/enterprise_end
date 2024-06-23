import { apiPrefix, instance } from ".";
/**
 * 登录接口
 * @param account 账户
 * @param password 密码
 * @returns 
 */
export const login = (account: String, password: String) => {
    return instance.post(`${apiPrefix}/admin/login/account`, {
        account: account,
        password: password
    })
}

export const logout = () => instance.post(`${apiPrefix}/admin/login/logout`);

export const weChatLogin = (code: string, state: string) => instance.put(`${apiPrefix}/admin/login/wxLogin`, {
    code,
    state
})
/**
 * 临时用微信登录接口
 */
export const weChatLoginTemp = () => instance.put(`${apiPrefix}/admin/login/wxLogin/temp`)

export const setNeedPassword = (newPassword: string) => instance.post(`${apiPrefix}/admin/employee/setPassword`, {
    newPassword
})