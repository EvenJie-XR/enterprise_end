<template>
    <div class="container">
        <div class="header">
            <SVGIcon icon-name="logo" class="logo"></SVGIcon>
            <el-button class="shop-settle-btn" @click="openShopEntryDialog()">商家入驻</el-button>
        </div>

        <div class="shop-container">
            <el-card class="shop-item" style="background-color: transparent;box-shadow: none; border: none;"
                v-for="(shop, index) in ShopList" :key="index">
                <img :src="shop.shopImage" style="width: 100px; height: 100px; border-radius: 50%;cursor:pointer"
                    @click="goInShop(shop.id)">
                <div
                    style="display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 10px; margin-top: 10px;">
                    <span>{{ shop.name }}</span>
                    <el-popconfirm width="220" confirm-button-text="我确定" cancel-button-text="关闭" :icon="WarningFilled"
                        icon-color="#626AEF" title="你确定解绑吗?" @confirm="HandelRemoveShop(shop.id, index)">
                        <template #reference>
                            <span style="text-decoration: underline;color: #4BB9A3;cursor: pointer;">解除绑定</span>
                        </template>
                    </el-popconfirm>
                </div>
            </el-card>
        </div>
    </div>

    <ShopSettleDialog ref="shopSettleDialog"></ShopSettleDialog>

</template>

<script setup lang="ts">
import SVGIcon from "../components/common/SVGIcon.vue"
import ShopSettleDialog from "../components/common/ShopSettleDialog.vue"
import { WarningFilled } from '@element-plus/icons-vue'
import { Ref, ref } from 'vue';
import { getShopList, choseShop, removeShop } from '../api/ShopChoice';
import type { ShopDetailType, ChoseShopDetailType } from '../types/ShopChoiceTypes'
import { useUserInfo } from "../stores/Login";
import { router } from "../routers/index"
const ShopList: Ref<Array<ShopDetailType>> = ref([]);
const ChooseShopDetail: Ref<ChoseShopDetailType> = ref({});
// 获取店铺列表
getShopList().then((res: any) => {
    ShopList.value = res.data.data
})
// 选择店铺;
const goInShop = (shopId: string) => {
    choseShop(shopId).then(res => {
        // 返回的店铺信息,
        ChooseShopDetail.value = res.data.data;
        // 切换token
        useUserInfo().setUserInfo({
            name: useUserInfo().name,
            id: useUserInfo().id,
            userName: useUserInfo().userName,
            token: ChooseShopDetail.value.token || useUserInfo().token
        })
        // 进入信息页面
        router.push({
            name: "Home"
        })
    }).catch((err: Object) => {
        console.log(err)
    })
}
// 移除店铺;
const HandelRemoveShop = (shopId: string, index: number) => {
    removeShop(shopId).then(() => {
        ShopList.value.splice(index, 1)
    }).catch((err: Object) => {
        console.log("添加店铺失败", err)
    })
}
const shopSettleDialog = ref(null);
const openShopEntryDialog = () => {
    console.log(shopSettleDialog.value);
    //@ts-ignore
    /**
     * 子组件暴露的方法
     */
    shopSettleDialog.value.openDialog();
}
</script>
<style lang="scss" scoped>
.container {
    display: flex;
    flex-direction: column;
    height: 100%;
    background: linear-gradient(to bottom, rgba(228, 250, 228, 1), rgba(228, 250, 228, 0));
}

.header {
    padding: 0px 100px;
    height: 60px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .logo {
        width: 150px;
        height: 53px;
    }

    .shop-settle-btn {
        border-radius: 20px;
        color: white;
        background-color: rgba(75, 185, 163, 1);
    }
}

.shop-container {
    flex: 1;
    /* 让内容区域填充剩余空间 */
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: auto;
    /* 内容区域滚动 */
    gap: 20px;
    padding: 20px;

}
</style>