<template>
    <div class="container">
        <div class="header">
            <SVGIcon icon-name="logo" class="logo"></SVGIcon>
            <el-button class="shop-settle-btn" @click="openShopEntryDialog()">商家入驻</el-button>
        </div>

        <div class="shop-container">
            <el-card class="shop-item" v-for="i in 5" :key="i">
                <img src="../assets/YuXiangRouSi.jpg" style="width: 100%; height: 100px; border-radius: 100%;">
                <template #footer>
                    <div
                        style="display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 10px;">
                        <span>店铺名称</span>
                        <span>解除绑定</span>
                    </div>
                </template>
            </el-card>
        </div>
    </div>

    <ShopSettleDialog ref="shopSettleDialog"></ShopSettleDialog>

</template>

<script setup lang="ts">
    import SVGIcon from "../components/common/SVGIcon.vue"
    import ShopSettleDialog from "../components/common/ShopSettleDialog.vue"
    import { ref } from 'vue';
    const shopSettleDialog = ref(null);
    const openShopEntryDialog = () => {
        console.log(shopSettleDialog.value);
        //@ts-ignore
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