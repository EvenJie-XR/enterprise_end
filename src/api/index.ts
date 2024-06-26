import axios from "axios"
import { useUserInfo } from "../stores/Login";
import { useLogout } from "../hooks/LoginHook"
import { ElMessage } from "element-plus";

// export const baseUrl = import.meta.env.MODE === 'development' ? "" : "http://43.136.114.250:8081";
export const baseUrl = import.meta.env.VITE_API_BASE_URL;
export const apiPrefix = import.meta.env.MODE === 'development' ? "/api" : "";

// 获取用户信息存储库，用于设置axios每次请求带上token请求头
const useUserInfoInstance = useUserInfo();

const instance = axios.create({
    baseURL: baseUrl,
    timeout: 10000,
});

// 添加请求拦截器
instance.interceptors.request.use(
    (config) => {
        // 在发送请求之前做些什么
        console.log("baseurl:", baseUrl, import.meta.env.VITE_API_BASE_URL);
        config.headers['token'] = useUserInfoInstance.token; // 添加 token 头部，如果不通过这个方法去获取token，那么这个token是不会实时变化的
        return config;
    },
    (error) => {
        // 对请求错误做些什么
        return Promise.reject(error);
    }
);

// 响应拦截器(拦截每次请求响应之后)
instance.interceptors.response.use(
    response => {
        // 在响应返回之后可以做一些操作

        return response;
    },
    error => {
        // 退出登录操作
        const useLogoutInstance = useLogout();
        // 在请求失败时进行处理
        if (error.response && error.response.status === 401) { // 如果请求失败的状态码是401说明token失效了，需要打回登录界面重新登录
            useLogoutInstance.logout();
        } else if (error.response && error.response.status === 403) { // 当前账号没有绑定商家
            ElMessage({
                message: "账号信息审核中，如有疑问联系管理员",
                type: "error"
            });
            useLogoutInstance.logout();
        }
        return Promise.reject(error);
    }
);

export {
    instance
}