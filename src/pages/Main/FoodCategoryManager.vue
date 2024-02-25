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
                <el-scrollbar class="content-container" always>
                    <div class="form-contianer">
                        <div class="form-item">
                            <div class="form-key">
                                菜品名称:
                            </div>
                            <div class="form-value">
                                <el-input v-model="foodName" placeholder="请输入菜品名称" size="large" style="width: 220px;" />
                            </div>
                        </div>
                        <div class="form-item">
                            <div class="form-key">
                                菜品分类:
                            </div>
                            <div class="form-value">
                                <el-select
                                    v-model="foodCategoryId"
                                    filterable
                                    clearable
                                    class="m-2"
                                    placeholder="请选择分类"
                                    size="large"
                                    style="width: 240px"
                                >
                                    <el-option
                                    v-for="item in foodCategoryIdOptions"
                                    :key="item.id"
                                    :label="item.name"
                                    :value="item.id"
                                    />
                                </el-select>
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
                                    clearable
                                    placeholder="请选择售卖状态"
                                    size="large"
                                    style="width: 240px"
                                >
                                    <el-option
                                    v-for="item in salesOptions"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value"
                                    />
                                </el-select>
                            </div>
                        </div>
                    </div>
                    <el-button color="#389E79" class="search-btn" size="large" @click="updateTableData">搜索</el-button>
                </el-scrollbar>
            </template>
        </ModelPanel>
        <!-- 数据 -->
        <ModelPanel class="data-sheet-container">
            <template #header>
                <div class="header-container">
                    <el-button color="#389E79" size="large" class="btn" @click="onBatchDeleteFoodBtnClick">批量删除</el-button>
                    <el-button color="#389E79" size="large" class="btn" @click="newFoodBtnClick">新建菜品</el-button>
                </div>
            </template>
            <template #content>
                <div class="content-container">
                    <Sheet class="sheet-container" :pinto="false" :table-data="tableData" height="500px" @selection-change="onSelectionChange">
                        <el-table-column type="selection" width="55" />
                        <el-table-column prop="name" label="菜品名称" />
                        <el-table-column prop="image" label="图片">
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
                        <el-table-column prop="category" label="商品分类">
                            <template #default="{row}">
                                {{ categoryIdAndCategoryMap[row.categoryId] }}
                            </template>
                        </el-table-column>
                        <el-table-column prop="price" label="售价">
                            <template #default="{row}">
                                ￥{{ row.price }}
                            </template>
                        </el-table-column>
                        <el-table-column prop="salesStatus" label="售卖状态">
                            <template #default="{row}">
                                {{ row.status ? "正在售卖" : "未上架" }}
                            </template>    
                        </el-table-column>
                        <el-table-column prop="updateTime" sortable label="最后操作时间" />
                        <el-table-column prop="control" label="操作" width="300">
                            <template #default="{row}">
                                <el-button text class="control-btn" type="success" @click="editFoodBtnClick(row)">修改</el-button>
                                <el-button text class="control-btn" type="danger" @click="onDeleteSalesBtnClick(row)">删除</el-button>
                                <el-button text class="control-btn" type="danger" v-if="row.status" @click="onHaltTheSalesBtnClick(row)">停售</el-button>
                                <el-button text class="control-btn" type="success" v-if="!row.status" @click="onStartSalesBtnClick(row)">启售</el-button>
                            </template>
                        </el-table-column>
                    </Sheet>
                    <div class="pagination-container">
                        <el-scrollbar always>
                            <el-pagination background layout="total, prev, pager, next, sizes, jumper" :total="total" v-model:current-page="currentPage" v-model:page-size="pageSize" @change="updateTableData" />
                        </el-scrollbar>
                    </div>
                </div>
            </template>
        </ModelPanel>
    </div>
    <ConfirmDialog v-model="haltTheSalesConfirmDialogVisible" tip="确定停售该商品吗？" btn-text="停售" @confirm="onHaltTheSalesConfirmBtnClick" />
    <ConfirmDialog v-model="startSalesConfirmDialogVisible" tip="确定启售该商品吗？" btn-text="启售" @confirm="onStartSalesConfirmBtnClick" />
    <ConfirmDialog v-model="deleteSalesConfirmDialogVisible" tip="确定删除该商品吗？" btn-text="删除" @confirm="onDeleteSalesConfirmBtnClick" />
    <AddFoodDialog v-model="AddFoodDialogVisible" @added="onAddFoodAdded" />
    <EditFoodDialog v-model="editFoodDialogVisible" :food="currentRow" @saved="onEditFoodSaved" />
</template>
<script lang="ts" setup>
import ModelPanel from "../../components/common/ModePanel.vue"
import Sheet from "../../components/common/Sheet.vue"
import { useFoodManager } from "../../hooks/page/FoodManager";
import ConfirmDialog from "../../components/common/ConfirmDialog.vue";
import AddFoodDialog from "../../components/FoodManager/AddFoodDialog.vue"
import EditFoodDialog from "../../components/FoodManager/EditFoodDialog.vue";

const {
    // search
    foodName,
    foodCategoryId,
    foodCategoryIdOptions,
    salesStatus,
    salesOptions,
    categoryIdAndCategoryMap,

    // table
    tableData,
    onSelectionChange,
    haltTheSalesConfirmDialogVisible,
    onHaltTheSalesBtnClick,
    onStartSalesBtnClick,
    startSalesConfirmDialogVisible,
    deleteSalesConfirmDialogVisible,
    onDeleteSalesBtnClick,
    onDeleteSalesConfirmBtnClick,
    AddFoodDialogVisible,
    newFoodBtnClick,
    editFoodDialogVisible,
    editFoodBtnClick,
    currentRow,

    currentPage,
    pageSize,
    total,

    // 总方法
    updateTableData,
    onBatchDeleteFoodBtnClick,
    onHaltTheSalesConfirmBtnClick,
    onStartSalesConfirmBtnClick,
    onAddFoodAdded,
    onEditFoodSaved
} = useFoodManager();
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

            :deep(.el-scrollbar__view) {
                display: flex;
                align-items: center;
                height: 100%;
            }

            .form-contianer {
                display: flex;
                align-items: center;
                .form-item {
                    display: flex;
                    align-items: center;
                    margin-right: 43px;
                    .form-key {
                        font-size: 22px;
                        white-space: nowrap;
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
                }
            }
        }
        .pagination-container {
            display: flex;
            justify-content: center;
        }
    }
}
// 手机端竖屏
@media screen and (max-width: 1024px) {
    .food-category-manager-container {
        .data-sheet-container {
            .header-container {
                padding: 0 2.5px;
            }
        }
    }
}
</style>
