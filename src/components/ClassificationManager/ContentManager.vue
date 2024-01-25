<template>
    <div class="content">
        <div class="buttons">
            <el-button color="#389E79"><span class="text">新增菜品分类</span></el-button>
            <el-button color="#389E79"><span class="text">新增套餐分类</span></el-button>
        </div>

        <div class="categoryArea">
            <div class="categoryBar">
                
            </div>
            <div class="categoryInfor">

            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { Ref, ref } from 'vue';
    type categroy = {
        name: string
        categoryType: string
        order: number
        status: number
        optionTime: number
        option: string
    }
    const dataList: Ref<categroy[]> = ref([
        {
            name: "荤菜",
            categoryType: "菜品分类",
            order: 1,
            status: 1,
            optionTime: 1,
            option: '修改'
        }
    ])

</script>

<style lang="scss" scoped>
    .content{
        .buttons{
            padding-top: 10px;
            padding-bottom: 10px;
            border-bottom: 1px solid #B7BFDD;
            display: flex;
            justify-content: right;
            
        }
    }


</style>