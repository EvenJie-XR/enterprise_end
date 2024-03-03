<template>
    <el-popover placement="bottom">
        <template #reference>
            <div class="avatar-login-container">
                <div class="avatar">
                    <img :src="avatarImg" alt="">
                </div>
                <div class="name">{{ name }}</div>
            </div>
        </template>

        <template #default>
            <div class="popover-content-container">
                <el-button text type="primary" @click="onEditAvatarAndNameClick">修改资料</el-button>
                <el-button text type="danger" @click="onLogoutBtnClick">退出登录</el-button>
            </div>
        </template>
    </el-popover>
    <EditAvatarAndName v-model="editAvatarAndNameVisible" @saved="onEditAvatarAndNameDialogSaved" />
</template>
<script lang="ts" setup>
import { ref } from 'vue';
import { getShopInfo } from '../../api/Header';
import { logout } from "../../api/Login"
import { useLogout } from "../../hooks/LoginHook"
import { useShopInfo } from '../../stores/Shop';
import EditAvatarAndName from '../header/EditAvatarAndName.vue';

const name = ref('');
const avatarImg = ref('');
const useShopInfoInstance = useShopInfo();
const updateShopInfo = () => {
    // 获取店铺信息
    getShopInfo().then((res) => {
        if(res.data.code) { // code == 1 获取成功
            const data = res.data.data;
            name.value = data.name;
            avatarImg.value = data.shopImage;
            // 全局存储店铺信息
            useShopInfoInstance.setShopInfo({
                id: data.id,
                name: data.name,
                avatarImg: data.shopImage
            })
        }
    })
}
updateShopInfo();
const onLogoutBtnClick = () => {
    logout().then(() => {
        const useLogoutInstance = useLogout();
        useLogoutInstance.logout();
    })
}
// 编辑资料对话框visible
const editAvatarAndNameVisible = ref(false);
/**
 * 编辑资料按钮click
 */
const onEditAvatarAndNameClick = () => {
    editAvatarAndNameVisible.value = true;
}
const onEditAvatarAndNameDialogSaved = () => {
    editAvatarAndNameVisible.value = false;
    updateShopInfo();
}
</script>

<style lang="scss" scoped>
.avatar-login-container {
    display: flex;
    align-items: center;
    margin-right: 52px;
    cursor: pointer;
    .avatar {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background-color: #AED7BD;
        margin-right: 12px;
        background-size: 100% 100%;
        overflow: hidden;
        img {
            width: 100%;
            height: 100%;
        }
    }
    .name {
        font-size: 18px;
        font-weight: 400;
    }
}
.popover-content-container {
    display: flex;
    justify-content: center;
    flex-direction: column;
    .el-button+.el-button {
        margin-left: 0px;
    }
}
</style>
