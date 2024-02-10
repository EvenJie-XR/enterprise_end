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
                                菜单名称:
                            </div>
                            <div class="form-value">
                                <el-input v-model="foodName" placeholder="请输入菜品名称" size="large" />
                            </div>
                        </div>
                        <div class="form-item">
                            <div class="form-key">
                                菜单分类:
                            </div>
                            <div class="form-value">
                                <el-input v-model="foodCategoryName" placeholder="请输入菜品分类" size="large" />
                            </div>
                        </div>
                        <div class="form-item">
                            <div class="form-key">
                                售卖状态:
                            </div>
                            <div class="form-value">
                                <el-select
                                    v-model="salesStatus"
                                    filterable
                                    placeholder="请选择"
                                    size="large"
                                    style="width: 240px"
                                >
                                    <el-option
                                    v-for="item in salesStatusOptionList"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value"
                                    />
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
                    <el-button color="#389E79" size="large" class="btn">批量删除</el-button>
                    <el-button color="#389E79" size="large" class="btn">新建菜品</el-button>
                </div>
            </template>
            <template #content>
                <div class="content-container">
                    <Sheet class="sheet-container" :pinto="false" :table-data="sheet" height="500px">
                        <el-table-column prop="name" label="菜品名称">
                            <template #header="{ column }">
                                <div class="check-box-of-column">
                                    <el-checkbox class="checkbox" />
                                    {{ column.label }}
                                </div>
                            </template>
                            <template #default="{row}">
                                <div class="check-box-of-column">
                                    <el-checkbox class="checkbox" />
                                    {{ row.name }}
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column prop="image" label="图片" width="140px">
                            <template #default="{ row }">
                                <div style="display: flex; align-items: center">
                                    <el-image 
                                    style="width: 106px; height: 54px"
                                    :src="row.image"
                                    :preview-src-list="[row.image]"
                                    :preview-teleported="true"
                                    fit="cover"
                                    />
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column prop="category" label="商品分类" width="140px" />
                        <el-table-column prop="price" label="售价" width="140px" />
                        <el-table-column prop="salesStatus" label="售卖状态" width="100px" />
                        <el-table-column prop="theEndControlTime" sortable label="最后操作时间" />
                        <el-table-column prop="control" label="操作">
                            <template #default>
                                <el-button text class="control-btn">接单</el-button>
                                <el-button text class="control-btn">拒单</el-button>
                                <el-button text class="control-btn">查看</el-button>
                            </template>
                        </el-table-column>
                    </Sheet>
                    <div class="pagination-container">
                        <el-pagination background layout="total, prev, pager, next" :total="1000" />
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
import YuXiangRouSiImage from "../../assets/YuXiangRouSi.jpg"

// 菜品名称
const foodName = ref();
// 菜品分类名称
const foodCategoryName = ref();
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
        name: "鱼香肉丝",
        image: YuXiangRouSiImage,
        category: "荤菜",
        price: "20.00元",
        salesStatus: "启售",
        theEndControlTime: "2021-01-02 11：11",
    },
    {
        name: "鱼香肉丝",
        image: YuXiangRouSiImage,
        category: "荤菜",
        price: "20.00元",
        salesStatus: "启售",
        theEndControlTime: "2021-01-02 11：11",
    },
    {
        name: "鱼香肉丝",
        image: YuXiangRouSiImage,
        category: "荤菜",
        price: "20.00元",
        salesStatus: "启售",
        theEndControlTime: "2021-01-02 11：11",
    },
    {
        name: "鱼香肉丝",
        image: YuXiangRouSiImage,
        category: "荤菜",
        price: "20.00元",
        salesStatus: "启售",
        theEndControlTime: "2021-01-02 11：11",
    },
    {
        name: "鱼香肉丝",
        image: YuXiangRouSiImage,
        category: "荤菜",
        price: "20.00元",
        salesStatus: "启售",
        theEndControlTime: "2021-01-02 11：11",
    },
    {
        name: "鱼香肉丝",
        image: YuXiangRouSiImage,
        category: "荤菜",
        price: "20.00元",
        salesStatus: "启售",
        theEndControlTime: "2021-01-02 11：11",
    },
    {
        name: "鱼香肉丝",
        image: YuXiangRouSiImage,
        category: "荤菜",
        price: "20.00元",
        salesStatus: "启售",
        theEndControlTime: "2021-01-02 11：11",
    },
    {
        name: "鱼香肉丝",
        image: YuXiangRouSiImage,
        category: "荤菜",
        price: "20.00元",
        salesStatus: "启售",
        theEndControlTime: "2021-01-02 11：11",
    },
    {
        name: "鱼香肉丝",
        image: YuXiangRouSiImage,
        category: "荤菜",
        price: "20.00元",
        salesStatus: "启售",
        theEndControlTime: "2021-01-02 11：11",
    },
    {
        name: "鱼香肉丝",
        image: YuXiangRouSiImage,
        category: "荤菜",
        price: "20.00元",
        salesStatus: "启售",
        theEndControlTime: "2021-01-02 11：11",
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
            justify-content: flex-end;
        }
    }
}
</style>
