import { apiPrefix, instance } from ".";

export const login = (phone: String, password: String) => { 
    return instance.post(`${apiPrefix}/admin/employee/login`, {
        phone,
        password
    })
}

export const logout = () => instance.post(`${apiPrefix}/admin/employee/logout`);

export const weChatLogin = (code: string, state: string) => instance.get(`${apiPrefix}/admin/employee/wxLogin?code=${code}&state=${state}`)

export const setNeedPassword = (newPassword: string) => instance.post(`${apiPrefix}/admin/employee/setPassword`, {
    newPassword
})