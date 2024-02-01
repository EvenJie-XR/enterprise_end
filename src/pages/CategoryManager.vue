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
                    <el-button color="#389E79" size="large" class="btn" @click="addDishCategory">新增菜品分类</el-button>
                    <el-button color="#389E79" size="large" class="btn" @click="addComboCategory">新增套餐分类</el-button>
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
                            <template #default="row">
                                <el-button text class="control-btn">修改</el-button>
                                <el-button text class="control-btn" @click="delCategroy(row, row.$index)">删除</el-button>
                                <el-button text class="control-btn" @click="chanegCategroyStatus(row.row)">{{ row.row.status == "启用" ? "禁用" : "启用" }}</el-button>
                            </template>
                        </el-table-column>
                    </Sheet>
                    <div class="pagination-container">
                        <el-pagination background layout="prev, pager, next, sizes, jumper" :total="1000" />
                    </div>
                </div>
            </template>
        </ModelPanel>

            <!-- 新增菜品分类和套餐的弹窗 -->
    <el-dialog v-model="dialogVisible" :title="dialogTittle" class="add-dialog" style="background-color: #F1F3EF; border-radius: 10px;">
    <el-form :model="form">
      <el-form-item :label="InputLabel" label-width="100px">
        <el-input v-model="form.name" autocomplete="off" placeholder="请输入"/>
      </el-form-item>
      <el-form-item label="排序：" label-width="100px">
        <el-input v-model="form.order" autocomplete="off" placeholder="请输入"/>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false" size="large">取消</el-button>
        <el-button type="primary" @click="updataSheet(true)" size="large">保存并继续添加</el-button>
        <el-button type="primary" @click="updataSheet(false)" size="large">保存</el-button>
      </span>
    </template>
  </el-dialog>
    </div>

</template>
<script lang="ts" setup>
import { ref } from "vue";
import ModelPanel from "../components/common/ModePanel.vue"
import Sheet from "../components/common/Sheet.vue"
import { Notification } from "../components/common/Notification.vue";
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
    }
])
// 决定对话框显示
let dialogVisible = ref(false)
// 对话框中 输入框的提示词
let InputLabel = ref("")
// 新增数据存放
let form = ref({
    name: "",
    order: ""
})
// 对话框标题
let dialogTittle = ref("")
// 记录用户新增的是套餐还是菜品 0套餐 1菜品
let option: number

// 修改分类状态
const chanegCategroyStatus = (dataItem: any) =>{
    const message = "确定" + `${dataItem.status == "启用" ? "禁用" : "启用"}` + "该分类吗？"
    // 弹出确认框
    Notification(message).then( (result) => {
        // 用户确认删除
        if (dataItem.status == "启用"){
            dataItem.status = "禁用"
        }
        else{
            dataItem.status = "启用"
        }
    })
}

// 删除分类
const delCategroy = (data: any, index: number) =>{
    // TODO：修改删除样式
    const message = "确定删除该分类吗？"
    // 弹出确认框
    Notification(message).then( () => {
        // 用户确认删除
        sheet.value.splice(index, 1)                
    })
}

// 新增菜品分类
const addDishCategory = () => {
    dialogTittle.value = "新建菜品分类"
    InputLabel.value = "分类名称："
    dialogVisible.value = true
    option = 1
}

// 新增套餐分类
const addComboCategory = () => {
    dialogTittle.value = "新建套餐分类"
    InputLabel.value = "套餐名称："
    dialogVisible.value = true
    option = 0
}

// 保存数据
const updataSheet = (again: boolean) => {
    dialogVisible.value = again
    const newData = {
        name: form.value.name,
        category: option === 0 ? "套餐分类" : "菜品分类",
        sort: form.value.order,
        status: "启用",
        // TODO: 改为当前时间
        controlTime: "2021-01-02 11：11",
    }
    sheet.value.push(newData)
    // 清空input框
    form.value = {
        name: "",
        order: ""
    }
}


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
}

    // dialog的样式
    :deep(.el-dialog__footer){
        background-color: #fff;
        border-top: 1px #999999 solid;
        border-bottom-left-radius: 10px;
        border-bottom-right-radius: 10px;
        display: flex;
        justify-content: center;
    }

    :deep(.el-dialog__header){
        
        border-top-left-radius: 10px;
        border-top-right-radius: 10px;
        background-color: #fff;
        // padding: 0 !important;
        margin: 0 !important;
        border-bottom: 1px #999999 solid;
        size: 34px;
    }



</style>
