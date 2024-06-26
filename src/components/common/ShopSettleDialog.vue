<template>
    <el-dialog title="商家入驻" v-model="visible" width="50%">
        <el-form :model="form" label-width="100px">
            <el-form-item label="账户" required>
                <el-input v-model="form.account" autocomplete="off" />
            </el-form-item>
            <el-form-item label="密码" required>
                <el-input v-model="form.password" autocomplete="off" />
            </el-form-item>
            <el-form-item label="商家名称" required>
                <el-input v-model="form.name" autocomplete="off" />
            </el-form-item>
            <el-form-item label="法人姓名" required>
                <el-input v-model="form.legalPersonName" autocomplete="off" />
            </el-form-item>
            <el-form-item label="身份证" required>
                <el-input v-model="form.idNumber" autocomplete="off" />
            </el-form-item>
            <el-form-item label="手机号" required>
                <el-input v-model="form.phone" autocomplete="off" />
            </el-form-item>
            <div class="upload-container">
                <div class="upload-item">
                    <label class="upload-label">上传统一社会信用代码证书照片</label>
                    <el-upload class="avatar-uploader" :action="upLoadImgUrl" :headers="Header" list-type="picture-card"
                        :on-success="handeleUploaCertificate" :on-remove="handleRemoveCertificate"
                        :show-file-list="false">
                        <img v-if="form.certificate" :src="form.certificate" class="avatar" />
                        <el-icon v-else class="avatar-uploader-icon">
                            <Plus />
                        </el-icon>
                    </el-upload>
                </div>
                <div class="upload-item">
                    <label class="upload-label">上传店铺照片</label>
                    <el-upload class="avatar-uploader" :action="upLoadImgUrl" :headers="Header" list-type="picture-card"
                        :on-success="handeleUploadShopImage" :on-remove="handleRemoveShopImage" :show-file-list="false">
                        <img v-if="form.shopImage" :src="form.shopImage" class="avatar" />
                        <el-icon v-else class="avatar-uploader-icon">
                            <Plus />
                        </el-icon>
                    </el-upload>
                </div>
            </div>
        </el-form>
        <template #footer>
            <div
                style="display: flex; flex-direction: column; justify-content: center; align-items: center; gap: 20px;">
                <el-button type="primary" @click="handleSubmit">提交</el-button>
                <span slot="footer">
                    绑定已有店铺?<a @click="handleBindingClick"
                        style="color: #4BB9A3;text-decoration: underline;font-weight: 900;cursor: pointer;">点击这里</a>
                </span>
            </div>
        </template>

    </el-dialog>
    <!-- 绑定已有店铺  -->
    <el-dialog v-model="isShowAddShopBox" title="绑定已有店铺" width="500">
        <el-form :model="Account_Password">
            <el-form-item label="账号" required>
                <el-input v-model="Account_Password.account" autocomplete="off" />
            </el-form-item>
            <el-form-item label="密码" required>
                <el-input v-model="Account_Password.password" type="password" autocomplete="off" />
            </el-form-item>
        </el-form>
        <template #footer>
            <div class="dialog-footer">
                <el-button @click="isShowAddShopBox = false">取消</el-button>
                <el-button type="primary" @click="handleAddShop">
                    确定
                </el-button>
            </div>
        </template>
    </el-dialog>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { addShop, newShop } from '../../api/ShopChoice';
import { ElMessage } from 'element-plus';
import { useUserInfo } from '../../stores/Login';
/** 
 * 是否显示添加现有的店铺的盒子
 */
const isShowAddShopBox = ref(false)
/** 
 * 添加商店的账户密码
 */
const Account_Password = ref({
    account: "",
    password: ""
})
/** 
 * 添加商店的账户密码
 */
const handleAddShop = () => {
    addShop(Account_Password.value.account, Account_Password.value.password).then(() => {
        ElMessage({
            message: "添加账户成功",
            type: "success"
        })
        isShowAddShopBox.value = false
        // 刷新加载
        window.location.reload();
    })
}
/**
 * 显示 添加现有的店铺的盒子
 */
const handleBindingClick = () => {
    isShowAddShopBox.value = true
    visible.value = false
}
const visible = ref(false);
const form = ref({
    name: '',
    shopImage: '',
    certificate: '',
    legalPersonName: '',
    idNumber: '',
    phone: '',
    account: '',
    password: ''
});
/**
 * 暴露方法给父组件
 */
defineExpose({
    openDialog: () => {
        console.log("弹窗出现");
        visible.value = true;
    }
});
/**
 * 提交表单
 */
const upLoadImgUrl = ref("http://43.136.114.250:8081/admin/common/upload");
const Header = {
    token: useUserInfo().token
}
const handeleUploadShopImage = (res: any) => {
    console.log("店铺照片路径", res.data)
    form.value.shopImage = res.data
}
const handeleUploaCertificate = (res: any) => {
    console.log("社会信用代码证书照片路径", res.data)
    form.value.certificate = res.data
}
const handleRemoveShopImage = () => {
    console.log("移除图片")
}
const handleRemoveCertificate = () => {
    console.log("移除图片")
}
const handleSubmit = () => {
    console.log('Form data:', form.value);
    newShop(form.value).then(res => {
        console.log("提交成功", res)
        ElMessage({
            message: res.data.msg,
            type: "error"
        })
    }).catch(err => {
        console.log("提交失败", err)
    })
    visible.value = false;
};

</script>

<style scoped lang="scss">
.upload-container {
    display: flex;
    justify-content: space-around;
    width: 100%;

    .upload-item {
        .avatar-uploader {
            margin-top: 20px;
            border: 1px dashed #d9d9d9;
            border-radius: 6px;
            cursor: pointer;
            position: relative;
            overflow: hidden;
            width: 178px;
            height: 178px;
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 0;
            box-sizing: border-box;

            &:hover {
                border-color: #4bb9a3;
            }

            .avatar-uploader-icon {
                font-size: 28px;
                color: #8c939d;
                width: 178px;
                height: 178px;
                line-height: 178px;
                text-align: center;
            }

            .avatar {
                width: 178px;
                height: 178px;
                display: flex;
            }

        }
    }
}
</style>