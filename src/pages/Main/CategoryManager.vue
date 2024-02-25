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
                                分类名称:
                            </div>
                            <div class="form-value">
                                <el-input v-model="categoryName" placeholder="请输入菜品名称" size="large" style="width: 220px;" />
                            </div>
                        </div>
                    </div>
                    <el-button color="#389E79" class="search-btn" size="large" @click="updateCategoryTableData">搜索</el-button>
                </el-scrollbar>
            </template>
        </ModelPanel>
        <!-- 数据 -->
        <ModelPanel class="data-sheet-container">
            <template #header>
                <div class="header-container">
                    <el-button color="#389E79" size="large" class="btn" @click="onAddCategoryBtnClick">新增菜品分类</el-button>
                </div>
            </template>
            <template #content>
                <div class="content-container">
                    <Sheet class="sheet-container" :pinto="false" :table-data="tableData" height="500px">
                        <el-table-column prop="id" label="分类ID" />
                        <el-table-column prop="name" label="分类名称" />
                        <el-table-column prop="sort" sortable label="排序" />
                        <el-table-column prop="status" label="状态">
                            <template #default="{row}">
                                {{ row.status ? "启用" : "禁用" }}
                            </template>
                        </el-table-column>
                        <el-table-column prop="updateTime" sortable label="最近操作时间" />
                        <el-table-column prop="createTime" sortable label="创建时间" />
                        <el-table-column prop="control" label="操作" width="260">
                            <template #default="{row}">
                                <el-button text class="control-btn" type="success" @click="onSetBtnClick(row)">修改</el-button>
                                <el-button text class="control-btn" type="danger" @click="onDeleteBtnClick(row)">删除</el-button>
                                <el-button text class="control-btn" type="warning" v-if="row.status === 1" @click="onDisableBtnClick(row)">禁用</el-button>
                                <el-button text class="control-btn" type="warning" v-if="!row.status" @click="onEnableBtnClick(row)">启用</el-button>
                            </template>
                        </el-table-column>
                    </Sheet>
                    <div class="pagination-container">
                        <el-scrollbar always>
                            <el-pagination background layout="total, prev, pager, next, sizes, jumper" :total="total" v-model:current-page="currentPage" v-model:page-size="pageSize" @change="updateCategoryTableData" />
                        </el-scrollbar>
                    </div>
                </div>
            </template>
        </ModelPanel>
    </div>
    <AddCategoryDialog v-model="addCategoryManagerDiaLogVisible" @saved="onAddCategorySaved" />
    <ConfirmDialog v-model="deleteCategoryConfirmDialogVisible" tip="确定删除分类吗?" btn-text="确定删除" @confirm="onDeleteConfirmBtnClick" />
    <ConfirmDialog v-model="disableCategoryConfirmDialogVisible" tip="确定禁用分类吗?" btn-text="确定禁用" @confirm="setCategoryStatus(0)" />
    <ConfirmDialog v-model="enableCategoryConfirmDialogVisible" tip="确定启用分类吗?" btn-text="确定启用" @confirm="setCategoryStatus(1)" />
    <SetCategoryDialog v-model="setCategoryDialogVisible" :row="currentRow" @seted="onSetCategorySetted" />
</template>
<script lang="ts" setup>
import ModelPanel from "../../components/common/ModePanel.vue"
import Sheet from "../../components/common/Sheet.vue"
import { useCategoryManager } from "../../hooks/page/CategoryManager";
import AddCategoryDialog from "../../components/CategoryManager/AddCategoryDialog.vue"
import ConfirmDialog from "../../components/common/ConfirmDialog.vue";
import SetCategoryDialog from "../../components/CategoryManager/SetCategoryDialog.vue";

const { categoryName, tableData, currentPage, pageSize, total, updateCategoryTableData, addCategoryManagerDiaLogVisible, onAddCategoryBtnClick, onAddCategorySaved, onDeleteBtnClick, deleteCategoryConfirmDialogVisible, onDeleteConfirmBtnClick, disableCategoryConfirmDialogVisible, onDisableBtnClick, setCategoryStatus, enableCategoryConfirmDialogVisible, onEnableBtnClick, currentRow, setCategoryDialogVisible, onSetBtnClick, onSetCategorySetted } = useCategoryManager();
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
}</style>
