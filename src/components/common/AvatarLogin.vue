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
                <el-button text @click="onEditPasswordBtnClick">修改密码</el-button>
                <el-button text type="primary" @click="onEditAvatarAndNameClick">修改资料</el-button>
                <el-button text type="danger" @click="onLogoutBtnClick">退出登录</el-button>
            </div>
        </template>
    </el-popover>
    <EditAvatarAndName v-model="editAvatarAndNameVisible" @saved="onEditAvatarAndNameDialogSaved" />
    <el-dialog id="need-password-dialog" v-model="needSetPasswordDialogVisible" title="设置密码" align-center>
        <el-form :model="needPasswordForm" label-width="auto" :rules="needPasswordFormRules" label-position="left" ref="needPasswordFormRef">
            <el-form-item label="旧密码:" prop="oldPassword">
                <el-input v-model="needPasswordForm.oldPassword"/>
            </el-form-item>
            <el-form-item label="新密码:" prop="password">
                <el-input v-model="needPasswordForm.password"/>
            </el-form-item>
            <el-form-item label="确认密码:" prop="confirmPassword">
                <el-input v-model="needPasswordForm.confirmPassword"/>
            </el-form-item>
            <el-form-item>
                <el-button style="width: 100%;" color="#28A767" @click="onNeedPasswordSubmit">保存</el-button>
            </el-form-item>
        </el-form>
    </el-dialog>
</template>
<script lang="ts" setup>
import { Ref, reactive, ref } from 'vue';
import { editPassword, getShopInfo } from '../../api/Header';
import { logout } from "../../api/Login"
import { useLogout } from "../../hooks/LoginHook"
import { useShopInfo } from '../../stores/Shop';
import EditAvatarAndName from '../header/EditAvatarAndName.vue';
import { ElMessage, FormInstance, FormRules } from 'element-plus';

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
/**
 * 需要设置密码对话框visible
 */
 const needSetPasswordDialogVisible = ref(false);
const needPasswordForm = reactive({
    password: '',
    confirmPassword: '',
    oldPassword: ''
})
const resetForm = () => {
    needPasswordForm.password = '';
    needPasswordForm.confirmPassword = '';
    needPasswordForm.oldPassword = '';
}
const needPasswordFormRef = ref<FormInstance>();
// form校验规则
const needPasswordFormRules: Ref<FormRules<typeof needPasswordForm>> = ref({
    password: [{ required: true, message: "密码不能为空" }],
    confirmPassword: [{ required: true, message: "确认密码不能为空" }],
    oldPassword: [{ required: true, message: "确认密码不能为空" }]
})
const onNeedPasswordSubmit = () => {
    needPasswordFormRef.value?.validate((success) => {
        if(success) {
            if(needPasswordForm.password !== needPasswordForm.confirmPassword) {
                ElMessage({
                    message: "两次密码不一致",
                    type: "error"
                })
            } else {
                editPassword(needPasswordForm.password, needPasswordForm.oldPassword).then((res) => {
                    console.log(res);
                    if(res.data.code) {
                        ElMessage({
                            message: "修改成功",
                            type: "success"
                        })
                        resetForm();
                        needSetPasswordDialogVisible.value = false;
                    } else {
                        ElMessage({
                            message: "旧密码错误",
                            type: "error"
                        })
                    }
                })
            }
        }
    })
}
const onEditPasswordBtnClick = () => {
    needSetPasswordDialogVisible.value = true;
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
