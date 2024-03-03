<template>
    <el-dialog align-center id="edit-avatar-and-name-dialog-container" center title="编辑资料" @open="onOpen" @close="onClose">
        <template #default>
            <el-form :model="form" label-width="120px" label-position="left" :rules="rules" ref="formRef">
                <el-form-item label="修改店铺头像:" prop="image">
                    <el-upload list-type="picture-card" accept="image/*" :limit="1" v-model:file-list="fileList"
                        :http-request="onImageUpload">
                        <el-icon>
                            <Plus />
                        </el-icon>

                        <template #file="">
                            <div>
                                <el-image id="avatar-image-preview-btn" class="el-upload-list__item-thumbnail"
                                    :src="form.image" :preview-src-list="[form.image]" :preview-teleported="true"
                                    fit="cover" />
                                <span class="el-upload-list__item-actions">
                                    <span class="el-upload-list__item-preview" @click="handlePictureCardPreview()">
                                        <el-icon><zoom-in /></el-icon>
                                    </span>
                                    <span class="el-upload-list__item-delete" @click="handleRemove()">
                                        <el-icon>
                                            <Delete />
                                        </el-icon>
                                    </span>
                                </span>
                            </div>
                        </template>
                    </el-upload>
                </el-form-item>
                <el-form-item label="修改店铺名:" prop="name">
                    <el-input v-model="form.name" placeholder="请输入店铺名称" />
                </el-form-item>
                <el-form-item>
                    <el-button color="#28A767" @click="onSave">保存</el-button>
                </el-form-item>
            </el-form>
        </template>
    </el-dialog>
</template>
<script lang="ts" setup>
import { reactive, ref } from 'vue';
import { uploadFile } from '../../api/FoodManager';
import { ElMessage, FormInstance, FormRules, UploadRequestOptions } from 'element-plus';
import { useShopInfo } from '../../stores/Shop';
import { saveShopAvatarAndName } from '../../api/Header';

const emit = defineEmits(['saved']);
const formRef = ref<FormInstance>();
const form = reactive({
    image: '',
    name: ''
})
const fileList = ref<any[]>([])
const rules = reactive<FormRules<typeof form>>({
    name: [{ required: true, trigger: 'blur', message: "名字不能为空" }],
    image: [{ required: true, trigger: 'blur', message: "图片不能为空" }],
})
/**
 * 处理图片上传
 * @param option 图片
 */
const onImageUpload = (option: UploadRequestOptions) => {
    const formData = new FormData();
    formData.append('file', option.file)
    uploadFile(option.file).then((res) => {
        if (res.data.code) {
            ElMessage({
                message: "图片上传成功",
                type: "success"
            })
            form.image = res.data.data;
        } else {
            ElMessage({
                message: "图片上传失败",
                type: "error"
            })
        }
    }).catch(() => {
        ElMessage({
            message: "图片上传失败",
            type: "error"
        })
    })
}
/**
 * 处理图片预览
 */
const handlePictureCardPreview = () => {
    const el = document.getElementById("avatar-image-preview-btn");
    el?.click();
}
/**
 * 处理图片移除
 */
const handleRemove = () => {
    fileList.value.pop();
    form.image = "";
}
const useShopInfoInstance = useShopInfo();
const resetForm = () => {
    form.name = '';
    form.image = '';
    fileList.value.pop();
}
const onOpen = () => {
    form.name = useShopInfoInstance.name;
    form.image = useShopInfoInstance.avatarImg;
    fileList.value.push({});
}
const onClose = () => {
    resetForm();
}
const onSave = () => {
    formRef.value?.validate((success) => {
        if(success) {
            saveShopAvatarAndName(form.name, form.image).then((res) => {
                if(res.data.code) {
                    ElMessage({
                        message: "店铺图片和名字保存成功",
                        type: "success"
                    })
                    emit("saved");
                } else {
                    ElMessage({
                        message: "店铺图片和名字保存失败",
                        type: "error"
                    })
                }
            })
        }
    })
    
}
</script>

<style lang="scss">
#edit-avatar-and-name-dialog-container {}

// 手机端竖屏
@media screen and (max-width: 1024px) {
    #edit-avatar-and-name-dialog-container {
        width: 90vw;
    }
}
</style>
<style lang="scss" scoped>
//
</style>
