import { router } from "../routers";
import { useUserInfo } from "../stores/Login"
import { useShopInfo } from "../stores/Shop";

/**
 * 用于退出登录的hook
 * @returns 
 */
export const useLogout = () => {
    const useUserInfoInstance = useUserInfo();
    const useShopInfoInstance = useShopInfo();
    const logout = () => {
        useUserInfoInstance.clearUserInfo();
        useShopInfoInstance.clearShopInfo();
        router.push({
            name: "Login"
        })
    }
    return {
        logout
    }
}