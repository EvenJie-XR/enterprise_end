import { defineStore } from "pinia";
import { ref } from "vue";

export const useShopInfo = defineStore('ShopInfo', () => {
    const id = ref(0);
    const name = ref('');
    const avatarImg = ref('');

    // 检查是否有之前登录的ShopInfo存储
    const localStorageUserInfoStr = localStorage.getItem("ShopInfo");
    if(localStorageUserInfoStr) {
        const localStorageUserInfo = JSON.parse(localStorageUserInfoStr);
        id.value = localStorageUserInfo.id;
        name.value = localStorageUserInfo.name;
        avatarImg.value = localStorageUserInfo.avatarImg;
    }

    // 设置商铺信息
    const setShopInfo = (shopInfo: {
        id: number,
        name: string,
        avatarImg: string
    }) => {
        id.value = shopInfo.id;
        name.value = shopInfo.name;
        avatarImg.value = shopInfo.avatarImg;
        localStorage.setItem("ShopInfo", JSON.stringify(shopInfo));
    }

    const clearShopInfo = () => {
        id.value = 0;
        name.value = '';
        avatarImg.value = '';
        localStorage.removeItem("ShopInfo");
    }
    return {
        id,
        name,
        avatarImg,
        setShopInfo,
        clearShopInfo
    }
})