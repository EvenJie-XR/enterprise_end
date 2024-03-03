<template>
    <el-dialog align-center id="add-food-dialog-container" title="新增菜品">
        <el-form label-position="left" label-width="118px" :model="form" ref="formRef" :rules="rules" @close="onClose">
            <el-form-item label="菜品名称:" prop="name">
                <el-input v-model="form.name" placeholder="请输入菜品名称..." />
            </el-form-item>
            <el-form-item label="菜品分类:" prop="category">
                <el-select v-model="form.category" filterable class="m-2" placeholder="请选择菜品分类...">
                    <el-option v-for="item in categoryOptions" :key="item.id" :label="item.name" :value="item.id" />
                </el-select>
            </el-form-item>
            <el-form-item label="菜品描述:" prop="description">
                <el-input v-model="form.description" :autosize="{ minRows: 2, maxRows: 4 }" type="textarea"
                    placeholder="请输入菜品描述..." />
            </el-form-item>
            <el-form-item label="菜品价格:" prop="price">
                <el-input-number v-model="form.price" :min="0" />
            </el-form-item>
            <el-form-item label="菜品启售状态:" prop="status">
                <el-select v-model="form.status" class="m-2" placeholder="请选择菜品启售状态...">
                    <el-option v-for="item in statusOptions" :key="item.value" :label="item.label" :value="item.value" />
                </el-select>
            </el-form-item>
            <el-form-item label="菜品图片:" prop="image">
                <el-upload list-type="picture-card" accept="image/*" :limit="1"
                    v-model:file-list="fileList" :http-request="onImageUpload" >
                    <el-icon>
                        <Plus />
                    </el-icon>

                    <template #file="">
                        <div>
                            <el-image id="food-image-preview-btn" class="el-upload-list__item-thumbnail" :src="form.image" :preview-src-list="[form.image]"
                                :preview-teleported="true" fit="cover" />
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
            <el-form-item>
                <el-button color="#28A767" @click="onAddBtnClick">新增菜品</el-button>
            </el-form-item>
        </el-form>
    </el-dialog>
</template>
<script lang="ts" setup>
import { Ref, reactive, ref } from 'vue';
import { addFood, getAllCategory, uploadFile } from '../../api/FoodManager';
import { ElMessage, FormInstance, FormRules, UploadRequestOptions, UploadUserFile } from 'element-plus';

const formRef: Ref<FormInstance> = ref() as Ref<FormInstance>;

const emit = defineEmits(['added'])

const form = ref({
    category: "",
    description: "",
    name: "",
    price: 0,
    status: 1,
    image: ""
})
const rules = reactive<FormRules<typeof form>>({
    name: [{ required: true, trigger: 'blur', message: "名字不能为空" }],
    category: [{ required: true, trigger: 'blur', message: "分类不能为空" }],
    price: [{ required: true, trigger: 'blur', message: "价格不能为空" }],
    status: [{ required: true, trigger: 'blur', message: "状态不能为空" }],
    image: [{ required: true, trigger: 'blur', message: "图片不能为空" }],
})
// 分类选项list
const categoryOptions: Ref<{ id: number, name: string }[]> = ref([]);
// 分类id和分类的对象
const categoryIdAndCategoryMap: Ref<any> = ref({});
// 获取所有分类放入分类选项列表提供选择
getAllCategory().then((res) => {
    if (res.data.code) {
        categoryOptions.value = res.data.data.records;
        // @ts-ignore
        form.value.category = categoryOptions.value[0].id;

        categoryOptions.value.forEach((foodCategory) => {
            categoryIdAndCategoryMap.value[foodCategory.id] = foodCategory.name;
        })
    }
})
const statusOptions = ref([
    {
        label: "启售",
        value: 1
    },
    {
        label: "停售",
        value: 0
    }
])
// 上传的文件列表（用来删除预览的图片）
const fileList: Ref<UploadUserFile[]> = ref([]);
const onImageUpload = (option: UploadRequestOptions) => {
    const formData = new FormData();
    formData.append('file', option.file)
    uploadFile(option.file).then((res) => {
        if(res.data.code) {
            ElMessage({
                message: "图片上传成功",
                type: "success"
            })
            form.value.image = res.data.data;
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
const handlePictureCardPreview = () => {
    const el = document.getElementById("food-image-preview-btn");
    el?.click();
}
const handleRemove = () => {
    fileList.value.pop();
    form.value.image = "";
}
/**
 * 重置表单内容
 */
const resetForm = () => {
    form.value = {
        category: "",
        description: "",
        name: "",
        price: 0,
        status: 1,
        image: ""
    };
    fileList.value.pop();
}
const onAddBtnClick = () => {
    formRef.value.validate((valid) => {
        if(valid) {
            addFood({
                categoryId: form.value.category,
                description: form.value.description,
                image: form.value.image,
                name: form.value.name,
                price: form.value.price,
                status: form.value.status
            }).then((res) => {
                if(res.data.code) {
                    ElMessage({
                        message: "新增菜品成功",
                        type: "success"
                    });
                    resetForm();
                    emit("added");
                } else {
                    ElMessage({
                        message: "新增菜品失败",
                        type: "error"
                    })
                }
            })
        } else {
            ElMessage({
                message: "所有内容不能为空",
                type: "error"
            })
        }
    })
    
}
const onClose = () => {
    resetForm();
}
</script>

<style lang="scss">
#add-food-dialog-container {
    width: 40vw;
}
// 手机端竖屏
@media screen and (max-width: 1024px) {
    #add-food-dialog-container {
        width: 90vw;
    }
}
</style>
<style lang="scss" scoped>
//
</style>
