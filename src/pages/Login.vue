<template>
    <el-container class="login-page-container">
        <el-header class="login-page-header-container">
            <SVGIcon icon-name="logo" class="header-logo"></SVGIcon>
        </el-header>
        <el-main class="login-page-main-container">
            <el-form label-position="top" label-width="100px" :model="form" style="width: 460px" ref="formRef" :rules="formRules">
                <el-form-item label="手机号:" prop="phone" required>
                    <el-input v-model="form.phone" placeholder="请输入手机号..." />
                </el-form-item>
                <el-form-item label="密码:" prop="password" required>
                    <el-input v-model="form.password" placeholder="请输入密码..." />
                </el-form-item>
                <el-form-item>
                    <el-button color="#28A767" style="width: 100%;" @click="onSubmit(formRef)" :loading="formSubmiting">登录</el-button>
                </el-form-item>
                <el-form-item class="quick-login-btn-container">
                    <SVGIcon icon-name="WeChat" class="quick-login-btn"></SVGIcon>
                </el-form-item>
            </el-form>
        </el-main>
    </el-container>
</template>
<script lang="ts" setup>
import { Ref, ref } from "vue";
import SVGIcon from "../components/common/SVGIcon.vue"
import { login } from "../api/Login"
import { ElMessage, FormRules, type FormInstance } from 'element-plus'
import { useUserInfo } from "../stores/Login"
import { router } from "../routers/index"

// form字段
const form = ref({
    phone: "",
    password: ""
})
// form实例
const formRef = ref();
// form校验规则
const formRules: Ref<FormRules<typeof form>> = ref({
    phone: [{ required: true, message: "手机号不能为空" }],
    password: [{ required: true, message: "密码不能为空" }]
})
// form是否请求中
const formSubmiting = ref(false);
// 表单校验
const formValidate = (formEl: FormInstance) => {

    return formEl.validate((valid: any) => valid ? true : false);

}
// 登录
const onSubmit = (formEl: FormInstance) => {

    // 表单规则校验
    formValidate(formEl).then((validateResult) => {

        // 表单校验成功才进行登录接口请求
        if (validateResult) {

            // 设置表单正在提交状态为true
            formSubmiting.value = true;

            login(form.value.phone, form.value.password).then((res) => {

                // 设置表单正在提交状态为false
                formSubmiting.value = false;

                if (res.data.code) { // code = 1登录成功

                    // 获取到UserInfo的pinia存储库
                    const useUserInfoInstance = useUserInfo();
                    // 设置登录成功之后的用户信息
                    const userInfo = res.data.data;
                    console.log(userInfo);
                    // 存储登录成功之后的用户信息到UserInfo存储库
                    useUserInfoInstance.setUserInfo(userInfo)
                    // 提示登录成功
                    ElMessage({
                        message: "登录成功",
                        type: "success"
                    });
                    // 登录成功跳转到工作台页面
                    router.push({
                        name: "Home"
                    })
                } else { // code = 0 登录失败

                    // 把后端返回的错误信息提示出来
                    ElMessage({
                        message: res.data.msg,
                        type: "error"
                    })
                    // 重置表单内容
                    formEl.resetFields()
                    
                }

            })

        }

    })

}
</script>

<style lang="scss" scoped>
.login-page-container {
    width: 100%;
    height: 100%;

    .login-page-header-container {
        height: 60px;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: white;

        .header-logo {
            width: 150px;
            height: 53px;
        }
    }

    .login-page-main-container {
        display: flex;
        justify-content: center;
        align-items: center;

        .quick-login-btn-container {
            .quick-login-btn {
                width: 40px;
                height: 40px;
                cursor: pointer;
            }

            &:deep(.el-form-item__content) {
                justify-content: center;
            }
        }
    }
}
</style>