<template>
    <el-dialog align-center width="40vw" title="新建菜品分类">
        <el-form
            label-width="100px"
            :model="form"
        >
            <el-form-item label="分类名称:">
                <el-input v-model="form.categoryName" />
            </el-form-item>
            <el-form-item label="排序:">
                <el-input-number v-model="form.sort" :min="1" :max="10" />
            </el-form-item>
            <el-form-item>
                <el-button color="#28A767" @click="onAddAndContinueBtnClick">新增并继续添加</el-button>
                <el-button color="#28A767" @click="onAddBtnClick">新增</el-button>
            </el-form-item>
        </el-form>
    </el-dialog>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
import { addCategory } from '../../api/CategoryManager';
import { ElMessage } from 'element-plus';

const form = ref({
    categoryName: "",
    sort: 1
})
const emit = defineEmits<{
  saved: [close: boolean] // 具名元组语法
}>();
const resetForm = () => {
    form.value.categoryName = '';
    form.value.sort = 1;
}
const add = (successCallBack: () => void) => {
    addCategory(form.value.categoryName, form.value.sort).then((res) => {
        if(res.data.code) {
            ElMessage({
                message: "新增菜品分类成功",
                type: "success"
            })
            successCallBack();
        } else {
            ElMessage({
                message: "新增菜品分类失败",
                type: "error"
            })
        }
    })
}
const onAddBtnClick = () => {
    add(() => {
        emit("saved", true);
        resetForm();
    });
}
const onAddAndContinueBtnClick = () => {
    add(() => {
        emit("saved", false);
        resetForm();
    })
}
</script>

<style lang="scss" scoped>
//
</style>
