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
                                订单号:
                            </div>
                            <div class="form-value">
                                <el-select v-model="salesStatus" filterable placeholder="请选择" size="large"
                                    style="width: 240px">
                                    <el-option v-for="item in salesStatusOptionList" :key="item.value" :label="item.label"
                                        :value="item.value" />
                                </el-select>
                            </div>
                        </div>
                        <div class="form-item">
                            <div class="form-key">
                                手机号:
                            </div>
                            <div class="form-value">
                                <el-select v-model="salesStatus" filterable placeholder="请选择" size="large"
                                    style="width: 240px">
                                    <el-option v-for="item in salesStatusOptionList" :key="item.value" :label="item.label"
                                        :value="item.value" />
                                </el-select>
                            </div>
                        </div>
                        <div class="form-item">
                            <div class="form-key">
                                下单时间:
                            </div>
                            <div class="form-value">
                                <el-input v-model="foodName" placeholder="请输入菜品名称" size="large" />
                            </div>
                        </div>
                    </div>
                    <el-button color="#389E79" class="search-btn" size="large">查询</el-button>
                    <el-button class="search-btn" size="large">重置</el-button>
                </div>
            </template>
        </ModelPanel>
        <!-- 数据 -->
        <ModelPanel class="data-sheet-container">
            <template #header>
                <div class="header-container">
                    <el-tabs v-model="activeCategoryName" class="category-tabs" @tab-change="handleActiveCategoryNameChange">
                        <el-tab-pane label="全部订单" name="allOrderForm"></el-tab-pane>
                        <el-tab-pane label="待接单" name="pendingOrders"></el-tab-pane>
                        <el-tab-pane label="待派送" name="toBeDelivered"></el-tab-pane>
                        <el-tab-pane label="派送中" name="Delivering"></el-tab-pane>
                        <el-tab-pane label="已完成" name="done"></el-tab-pane>
                        <el-tab-pane label="已取消" name="canceled"></el-tab-pane>
                    </el-tabs>
                </div>
            </template>
            <template #content>
                <div class="content-container">
                    <Sheet class="sheet-container" :pinto="true" :table-data="sheet" height="500px">
                        <el-table-column prop="no" label="订单号">
                            <template #header="{ column }">
                                <div class="check-box-of-column">
                                    <el-checkbox class="checkbox" />
                                    {{ column.label }}
                                </div>
                            </template>
                            <template #default="{ row }">
                                <div class="check-box-of-column">
                                    <el-checkbox class="checkbox" />
                                    {{ row.no }}
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column prop="username" label="用户名" />
                        <el-table-column prop="phoneNumber" label="手机号" />
                        <el-table-column prop="addresss" label="地址" />
                        <el-table-column prop="completeTime" sortable label="送达时间" />
                        <el-table-column prop="price" label="实收金额" />
                        <el-table-column prop="notes" label="备注" />
                        <el-table-column prop="control" label="操作">
                            <template #default>
                                <el-button text class="control-btn">退单</el-button>
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
import ModelPanel from "../../components/common/ModePanel.vue"
import Sheet from "../../components/common/Sheet.vue"

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
// 激活的分类名称
const activeCategoryName = ref("allOrderForm");
// 处理激活的分类名称切换
const handleActiveCategoryNameChange = () => {

}

const sheet = ref([
    {
        no: "2021010200001",
        username: "播仔",
        phoneNumber: "13989490901",
        addresss: "金燕楼办公楼（建材城西路九号）四层--宾馆北侧办公室",
        completeTime: "2021-01-02 11：11",
        price: "40.00",
        notes: "多加韭菜"
    },
    {
        no: "2021010200001",
        username: "播仔",
        phoneNumber: "13989490901",
        addresss: "金燕楼办公楼（建材城西路九号）四层--宾馆北侧办公室",
        completeTime: "2021-01-02 11：11",
        price: "40.00",
        notes: "多加韭菜"
    },
    {
        no: "2021010200001",
        username: "播仔",
        phoneNumber: "13989490901",
        addresss: "金燕楼办公楼（建材城西路九号）四层--宾馆北侧办公室",
        completeTime: "2021-01-02 11：11",
        price: "40.00",
        notes: "多加韭菜"
    },
    {
        no: "2021010200001",
        username: "播仔",
        phoneNumber: "13989490901",
        addresss: "金燕楼办公楼（建材城西路九号）四层--宾馆北侧办公室",
        completeTime: "2021-01-02 11：11",
        price: "40.00",
        notes: "多加韭菜"
    },
    {
        no: "2021010200001",
        username: "播仔",
        phoneNumber: "13989490901",
        addresss: "金燕楼办公楼（建材城西路九号）四层--宾馆北侧办公室",
        completeTime: "2021-01-02 11：11",
        price: "40.00",
        notes: "多加韭菜"
    },
    {
        no: "2021010200001",
        username: "播仔",
        phoneNumber: "13989490901",
        addresss: "金燕楼办公楼（建材城西路九号）四层--宾馆北侧办公室",
        completeTime: "2021-01-02 11：11",
        price: "40.00",
        notes: "多加韭菜"
    },
    {
        no: "2021010200001",
        username: "播仔",
        phoneNumber: "13989490901",
        addresss: "金燕楼办公楼（建材城西路九号）四层--宾馆北侧办公室",
        completeTime: "2021-01-02 11：11",
        price: "40.00",
        notes: "多加韭菜"
    },
    {
        no: "2021010200001",
        username: "播仔",
        phoneNumber: "13989490901",
        addresss: "金燕楼办公楼（建材城西路九号）四层--宾馆北侧办公室",
        completeTime: "2021-01-02 11：11",
        price: "40.00",
        notes: "多加韭菜"
    },
    {
        no: "2021010200001",
        username: "播仔",
        phoneNumber: "13989490901",
        addresss: "金燕楼办公楼（建材城西路九号）四层--宾馆北侧办公室",
        completeTime: "2021-01-02 11：11",
        price: "40.00",
        notes: "多加韭菜"
    },
    {
        no: "2021010200001",
        username: "播仔",
        phoneNumber: "13989490901",
        addresss: "金燕楼办公楼（建材城西路九号）四层--宾馆北侧办公室",
        completeTime: "2021-01-02 11：11",
        price: "40.00",
        notes: "多加韭菜"
    }
])
</script>

<style lang="scss" scoped>
.food-category-manager-container {

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
            display: flex;
            .category-tabs {
                width: 100%;
                height: 100%;
                padding: 10px 0 0 0;
                :deep(.el-tabs__header) {
                    margin: 0;
                }
                :deep(.el-tabs__nav) {
                    .el-tabs__item {
                        font-size: 20px;
                        padding: 20px 60px;
                    }
                }
            }
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
}
</style>
