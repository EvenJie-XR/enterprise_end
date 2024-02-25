import { instance } from ".";

export const login = (phone: String, password: String) => { 
    return instance.post("/api/admin/employee/login", {
        phone,
        password
    })
}

export const logout = () => instance.post("/api/admin/employee/logout");

export const weChatLogin = (code: string, state: string) => instance.get(`/api/admin/employee/wxLogin?code=${code}&state=${state}`)