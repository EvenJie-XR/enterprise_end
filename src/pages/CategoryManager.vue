<template>
    <div class="food-category-manager-container">
        <!-- 筛选部分 -->
        <ModelPanel class="food-manager-container">
            <template #header>
                <div class="header-container">
                    菜品管理
                </div>
            </template>
            <template #content>
                <div class="content-container">
                    <div class="form-contianer">
                        <div class="form-item">
                            <div class="form-key">
                                分类名称:
                            </div>
                            <div class="form-value">
                                <el-input v-model="foodName" placeholder="请输入菜品名称" size="large" />
                            </div>
                        </div>
                        <div class="form-item">
                            <div class="form-key">
                                分类类型:
                            </div>
                            <div class="form-value">
                                <el-select v-model="salesStatus" filterable placeholder="请选择" size="large"
                                    style="width: 240px">
                                    <el-option v-for="item in salesStatusOptionList" :key="item.value" :label="item.label"
                                        :value="item.value" />
                                </el-select>
                            </div>
                        </div>
                    </div>
                    <el-button color="#389E79" class="search-btn" size="large">搜索</el-button>
                </div>
            </template>
        </ModelPanel>
        <!-- 数据 -->
        <ModelPanel class="data-sheet-container">
            <template #header>
                <div class="header-container">
                    <el-button color="#389E79" size="large" class="btn">新增菜品分类</el-button>
                    <el-button color="#389E79" size="large" class="btn">新增套餐分类</el-button>
                </div>
            </template>
            <template #content>
                <div class="content-container">
                    <Sheet class="sheet-container" :pinto="false" :table-data="sheet" height="500px">
                        <el-table-column prop="name" label="分类名称">
                            <template #header="{ column }">
                                <div class="check-box-of-column">
                                    <el-checkbox class="checkbox" />
                                    {{ column.label }}
                                </div>
                            </template>
                            <template #default="{ row }">
                                <div class="check-box-of-column">
                                    <el-checkbox class="checkbox" />
                                    {{ row.name }}
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column prop="category" label="分类类型" />
                        <el-table-column prop="sort" label="排序" />
                        <el-table-column prop="status" label="状态" />
                        <el-table-column prop="controlTime" sortable label="操作时间" />
                        <el-table-column prop="control" label="操作">
                            <template #default>
                                <el-button text class="control-btn">接单</el-button>
                                <el-button text class="control-btn">拒单</el-button>
                                <el-button text class="control-btn">查看</el-button>
                            </template>
                        </el-table-column>
                    </Sheet>
                    <div class="pagination-container">
                        <el-pagination background layout="prev, pager, next, sizes, jumper" :total="1000" />
                    </div>
                </div>
            </template>
        </ModelPanel>
    </div>
</template>
<script lang="ts" setup>
import { ref } from "vue";
import ModelPanel from "../components/common/ModePanel.vue"
import Sheet from "../components/common/Sheet.vue"

// 菜品名称
const foodName = ref();
// 售卖状态
const salesStatus = ref();
// 售卖状态列表
const salesStatusOptionList = ref([
    {
        label: "正在售卖",
        value: 0
    },
    {
        label: "未上架",
        value: 1
    }
]);

const sheet = ref([
    {
        name: "荤菜",
        category: "菜品分类",
        sort: "1",
        status: "启用",
        controlTime: "2021-01-02 11：11",
    },
    {
        name: "荤菜",
        category: "菜品分类",
        sort: "2",
        status: "启用",
        controlTime: "2021-01-02 11：11",
    },
    {
        name: "荤菜",
        category: "菜品分类",
        sort: "3",
        status: "启用",
        controlTime: "2021-01-02 11：11",
    },
    {
        name: "周一套餐",
        category: "套餐分类",
        sort: "4",
        status: "禁用",
        controlTime: "2021-01-02 11：11",
    },
    {
        name: "荤菜",
        category: "菜品分类",
        sort: "5",
        status: "禁用",
        controlTime: "2021-01-02 11：11",
    },
    {
        name: "荤菜",
        category: "菜品分类",
        sort: "6",
        status: "启用",
        controlTime: "2021-01-02 11：11",
    },
    {
        name: "荤菜",
        category: "菜品分类",
        sort: "1",
        status: "禁用",
        controlTime: "2021-01-02 11：11",
    },
    {
        name: "荤菜",
        category: "菜品分类",
        sort: "1",
        status: "启用",
        controlTime: "2021-01-02 11：11",
    },
    {
        name: "荤菜",
        category: "菜品分类",
        sort: "1",
        status: "启用",
        controlTime: "2021-01-02 11：11",
    },
    {
        name: "荤菜",
        category: "菜品分类",
        sort: "1",
        status: "启用",
        controlTime: "2021-01-02 11：11",
    }
])
</script>

<style lang="scss" scoped>
.food-category-manager-container {
    padding: 20px 20px 20px 0;

    .food-manager-container {
        margin-bottom: 37px;

        .header-container {
            font-size: 26px;
        }

        .content-container {
            height: 70px;
            background: #FFF;
            display: flex;
            align-items: center;
            padding: 0 18px;
            border-radius: 10px;
            box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);

            .form-contianer {
                display: flex;
                align-items: center;

                .form-item {
                    display: flex;
                    align-items: center;
                    margin-right: 43px;

                    .form-key {
                        font-size: 22px;
                    }

                    .form-value {
                        margin-left: 10px;
                    }
                }
            }

            .search-btn {
                font-size: 22px;
                padding: 20px 40px;
                margin-left: 40px;
            }
        }
    }

    .data-sheet-container {
        border-radius: 10px 10px 10px 10px;
        background-color: white;
        height: 640px;

        .header-container {
            border-bottom: 1px solid #B7BFDD;
            height: 66px;
            display: flex;
            align-items: center;
            justify-content: flex-end;
            padding: 0 60px;

            .btn {
                font-size: 20px;
                padding: 20px 40px;
            }
        }

        .content-container {
            padding: 0 10px;

            .sheet-container {
                border-radius: 5px;
                margin-bottom: 15px;

                .check-box-of-column {
                    display: flex;
                    align-items: center;

                    .checkbox {
                        margin-right: 10px;
                    }
                }

                .control-btn {
                    color: #0F1865;
                }
            }
        }

        .pagination-container {
            display: flex;
            justify-content: center;
        }
    }
}</style>
