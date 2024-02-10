import { router } from "../routers";
import { useUserInfo } from "../stores/Login"

/**
 * 用于退出登录的hook
 * @returns 
 */
export const useLogout = () => {
    const useUserInfoInstance = useUserInfo();
    const logout = () => {
        useUserInfoInstance.clearUserInfo();
        router.push({
            name: "Login"
        })
    }
    return {
        logout
    }
}