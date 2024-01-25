<template>
    <div class="content">
        <div class="categoryArea">
            <SheetLayout class="sheetContainer">
                <template #header>
                    <div class="buttons">
                        <el-button color="#389E79"><span class="text">新增菜品分类</span></el-button>
                        <el-button color="#389E79"><span class="text">新增套餐分类</span></el-button>
                    </div>
                </template>
                <template #sheet>
                    <Sheet :table-data="dataList">
                        <el-table-column prop="name" label="分类名称"></el-table-column>
                        <el-table-column prop="categoryType" label="分类类型"></el-table-column>
                        <el-table-column prop="order" label="排序"></el-table-column>
                        <el-table-column prop="status" label="状态"></el-table-column>
                        <el-table-column prop="optionTime" label="操作时间"></el-table-column>
                        <el-table-column label="操作">
                            <template #default>
                                <el-button text >修改</el-button>
                                <el-button text >删除</el-button>
                                <el-button text >禁用</el-button>
                            </template>
                            
                        </el-table-column>
                    </Sheet>
                </template>
                <template #pagination>
                    <el-pagination background layout="prev, pager, next, sizes, jumper" :total="1000" />
                </template>
            </SheetLayout>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { Ref, ref } from 'vue';
    import Sheet from '../common/Sheet.vue'
    import SheetLayout from '../common/SheetLayout.vue'
    type categroy = {
        name: string
        categoryType: string
        order: number
        status: number
        optionTime: number
    }
    const dataList: Ref<categroy[]> = ref([
        {
            name: "荤菜",
            categoryType: "菜品分类",
            order: 1,
            status: 1,
            optionTime: 1,
        },
        {
            name: "荤菜",
            categoryType: "菜品分类",
            order: 1,
            status: 1,
            optionTime: 1,
        },
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