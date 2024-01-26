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
                    <Sheet>
                        <el-table-column prop="no" label="订单号">
                            <template #header="{ column }">
                                <div class="check-box-of-column">
                                    <el-checkbox />
                                    {{ column.label }}
                                </div>
                            </template>
                            <template #default="{row}">
                                <div class="check-box-of-column">
                                    <el-checkbox />
                                    {{ row.no }}
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column prop="image" label="图片"/>
                        <el-table-column prop="category" label="商品分类" />
                        <el-table-column prop="price" label="售价" />
                        <el-table-column prop="money" label="售卖状态" />
                        <el-table-column prop="notes" sortable label="最后操作时间" />
                        <el-table-column prop="control" label="操作">
                            <template #default>
                                <el-button text class="control-btn">接单</el-button>
                                <el-button text class="control-btn">拒单</el-button>
                                <el-button text class="control-btn">查看</el-button>
                            </template>
                        </el-table-column>
                    </Sheet>
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
            justify-content: space-around;
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

                }
            }
            .search-btn {
                font-size: 22px;
                padding: 20px 40px;
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
    }
}
</style>
