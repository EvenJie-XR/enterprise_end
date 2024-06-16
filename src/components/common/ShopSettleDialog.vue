<template>
    <el-dialog title="商家入驻" v-model="visible" width="50%">
        <el-form :model="form" ref="form" label-width="100px" >
            <el-form-item label="商家名称">
                <el-input v-model="form.shopName"  />
            </el-form-item>
            <el-form-item label="法人姓名">
                <el-input v-model="form.ownerName" />
            </el-form-item>
            <el-form-item label="身份证">
                <el-input v-model="form.idCard" />
            </el-form-item>
            <el-form-item label="手机号">
                <el-input v-model="form.phone" />
            </el-form-item>
            <div class="upload-container">
                <div class="upload-item">
                    <label class="upload-label">上传统一社会信用代码证书照片</label>
                    <el-upload class="upload-demo" drag action="https://jsonplaceholder.typicode.com/posts/" list-type="picture-card">
                        <i class="el-icon-plus"></i>
                    </el-upload>
                </div>
                <div class="upload-item">
                    <label class="upload-label">店铺照片</label>
                    <el-upload class="upload-demo" drag action="https://jsonplaceholder.typicode.com/posts/" list-type="picture-card">
                        <i class="el-icon-plus"></i>
                    </el-upload>
                </div>
            </div>
        </el-form>
        <template #footer>
            <div style="display: flex; flex-direction: column; justify-content: center; align-items: center; gap: 20px;"> 
                    <el-button type="primary" @click="handleSubmit">提交</el-button>
                    <span slot="footer" >
                        绑定已有店铺？<a @click="handleBindingClick">点击这里</a>
                    </span>
                </div>
        </template>

    </el-dialog>
</template>

<script setup lang="ts">
    import { ref } from 'vue';

    const visible = ref(false);
    const form = ref({
        shopName: '',
        ownerName: '',
        idCard: '',
        phone: ''
    });

    defineExpose({
        openDialog: () => {
            console.log("弹窗出现");
            visible.value = true;
        }
    });

    const handleSubmit = () => {
        console.log('Form data:', form.value);
        visible.value = false;
    };

    const handleBindingClick = () => {
        console.log('Binding existing shop');
    };
</script>

<style scoped>
    .upload-demo {
        width: 100%;
        height: 150px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 6px;
        cursor: pointer;
    }

    .upload-container {
        display: flex;
        justify-content: space-around;
        
    }

    .upload-container .el-form-item {
        flex: 1;
        margin-right: 20px;
    }

    .upload-container .el-form-item:last-child {
        margin-right: 0;
    }
    .upload-item{


    }
</style>