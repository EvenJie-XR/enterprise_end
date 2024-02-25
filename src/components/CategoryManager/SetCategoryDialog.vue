<template>
    <el-dialog align-center id="set-category-dialog-container" title="修改菜品分类信息">
        <el-form
            label-width="100px"
            :model="row"
        >
            <el-form-item label="分类名称:">
                <el-input v-model="row.name" />
            </el-form-item>
            <el-form-item label="排序:">
                <el-input-number v-model="row.sort" :min="1" :max="10" />
            </el-form-item>
            <el-form-item>
                <el-button color="#28A767" @click="onSaveBtnClick">保存</el-button>
            </el-form-item>
        </el-form>
    </el-dialog>
</template>
<script lang="ts" setup>
import { ElMessage } from 'element-plus';
import { setCategory } from '../../api/CategoryManager';

const row = defineModel<any>('row');

const emit = defineEmits<{
  seted: [] // 具名元组语法
}>();

const onSaveBtnClick = () => {
    setCategory(row.value.id, row.value.name, row.value.sort).then((res) => {
        if(res.data.code) {
            ElMessage({
                message: "修改分类成功",
                type: "success"
            })
            emit("seted");
        } else {
            ElMessage({
                message: "修改分类失败",
                type: "error"
            })
        }
    });
}
</script>

<style lang="scss">
#set-category-dialog-container {
    width: 40vw;
}
// 手机端竖屏
@media screen and (max-width: 1024px) {
    #set-category-dialog-container {
        width: 90vw;
    }
}
</style>
<style lang="scss" scoped>
//
</style>
