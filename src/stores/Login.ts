import { defineStore } from "pinia";
import { ref } from "vue";
import { UserInfoType } from "../types/LoginStoreTypes";

/**
 * 用于存储用户信息
 */
export const useUserInfo = defineStore("UserInfo", () => {
    // 用户token
    const token = ref('');
    // 用户id
    const id = ref(0);
    // 姓名
    const name = ref('');
    // 用户名
    const userName = ref('');

    // 检查是否有之前登录的UserInfo存储
    const localStorageUserInfoStr = localStorage.getItem("UserInfo");
    if(localStorageUserInfoStr) {
        const localStorageUserInfo = JSON.parse(localStorageUserInfoStr);
        token.value = localStorageUserInfo.token;
        id.value = localStorageUserInfo.id;
        name.value = localStorageUserInfo.name;
        userName.value = localStorageUserInfo.userName;
    }

    // 设置用户信息(常用于登录)
    const setUserInfo = (userInfo: UserInfoType) => {
        token.value = userInfo.token;
        id.value = userInfo.id;
        name.value = userInfo.name;
        userName.value = userInfo.userName;
        localStorage.setItem("UserInfo", JSON.stringify(userInfo));
    }

    // 清掉用户信息(常用于登出)
    const clearUserInfo = () => {
        token.value = '';
        id.value = 0;
        name.value = '';
        userName.value = '';
        localStorage.removeItem("UserInfo");
    }
    return {
        token,
        id,
        name,
        userName,
        setUserInfo,
        clearUserInfo
    }
})