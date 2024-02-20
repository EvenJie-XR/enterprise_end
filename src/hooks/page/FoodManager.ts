import { Ref, computed, ref } from "vue";
import { batchDeleteFood, getAllCategory, getFood, setStatus } from "../../api/FoodManager";
import { ElMessage } from "element-plus";

/**
 * 搜索菜品部分
 * @returns 
 */
const useSearch = () => {
    // 菜品名称
    const foodName = ref("");
    // 菜品分类id
    const foodCategoryId = ref("");
    // 菜品分类选项列表
    const foodCategoryIdOptions: Ref<{ id: number, name: string }[]> = ref([]);
    // 分类id和分类的对象
    const categoryIdAndCategoryMap: Ref<any> = ref({});
    // 获取所有分类放入分类选项列表提供选择
    getAllCategory().then((res) => {
        if(res.data.code) {
            foodCategoryIdOptions.value = res.data.data.records;

            foodCategoryIdOptions.value.forEach((foodCategory) => {
                categoryIdAndCategoryMap.value[foodCategory.id] = foodCategory.name;
            })
        }
    })
    // 售卖状态
    const salesStatus = ref("");
    // 售卖状态选项列表
    const salesOptions = [
        {
            value: 0,
            label: "未上架",
        },
        {
            value: 1,
            label: "正在售卖"
        }
    ];
    return {
        foodName,
        foodCategoryId,
        foodCategoryIdOptions,
        salesStatus,
        salesOptions,
        categoryIdAndCategoryMap,
    }
}

/**
 * 菜品表格部分
 * @returns 
 */
const useSheet = () => {
    const tableData = ref([]);
    const multipleSelection = ref<any[]>([]);
    const onSelectionChange = (val: any[]) => {
        multipleSelection.value = val;
    }
    const currentRow: Ref<any> = ref();
    // 停售确认弹窗visible
    const haltTheSalesConfirmDialogVisible = ref(false);
    // 启售确认弹窗visible
    const startSalesConfirmDialogVisible = ref(false);
    // 删除确认弹窗visible
    const deleteSalesConfirmDialogVisible = ref(false);
    // 添加菜品对话框visible
    const AddFoodDialogVisible = ref(false);
    // 修改菜品对话框visible
    const editFoodDialogVisible = ref(false);
    /**
     * 停售按钮click事件
     */
    const onHaltTheSalesBtnClick = (row: any) => {
        haltTheSalesConfirmDialogVisible.value = true;
        currentRow.value = row;
    }
    /**
     * 停售按钮click事件
     */
    const onStartSalesBtnClick = (row: any) => {
        startSalesConfirmDialogVisible.value = true;
        currentRow.value = row;
    }
    /**
     * 删除按钮click事件
     */
    const onDeleteSalesBtnClick = (row: any) => {
        deleteSalesConfirmDialogVisible.value = true;
        currentRow.value = row;
    }
    /**
     * 新建菜品按钮click事件
     */
    const newFoodBtnClick = () => {
        AddFoodDialogVisible.value = true;
    }
    /**
     * 编辑菜品按钮click
     */
    const editFoodBtnClick = (row: any) => {
        editFoodDialogVisible.value = true;
        currentRow.value = row;
    }
    return {
        tableData,
        multipleSelection,
        onSelectionChange,
        haltTheSalesConfirmDialogVisible,
        onHaltTheSalesBtnClick,
        currentRow,
        onStartSalesBtnClick,
        startSalesConfirmDialogVisible,
        deleteSalesConfirmDialogVisible,
        onDeleteSalesBtnClick,
        AddFoodDialogVisible,
        newFoodBtnClick,
        editFoodDialogVisible,
        editFoodBtnClick
    }
}

/**
 * 分页部分
 * @returns 
 */
const usePagination = () => {
    const currentPage = ref(1);
    const pageSize = ref(10);
    const total = ref(0);
    return {
        currentPage,
        pageSize,
        total
    }
}

/**
 * 整体菜品管理
 * @returns 
 */
export const useFoodManager = () => {
    // 搜索部分
    const {
        foodName,
        foodCategoryId,
        foodCategoryIdOptions,
        salesStatus,
        salesOptions,
        categoryIdAndCategoryMap
    } = useSearch();

    // 表格部分
    const {
        tableData,
        multipleSelection,
        onSelectionChange,
        haltTheSalesConfirmDialogVisible,
        onHaltTheSalesBtnClick,
        currentRow,
        onStartSalesBtnClick,
        startSalesConfirmDialogVisible,
        deleteSalesConfirmDialogVisible,
        onDeleteSalesBtnClick,
        AddFoodDialogVisible,
        newFoodBtnClick,
        editFoodDialogVisible,
        editFoodBtnClick
    } = useSheet();

    // 分页部分
    const {
        currentPage,
        pageSize,
        total
    } = usePagination();

    /**
     * 获取菜品接口参数对象
     */
    const getFoodOption = computed(() => {
        return {
            name: foodName.value,
            categoryId: foodCategoryId.value,
            status: salesStatus.value,
            page: currentPage.value,
            pageSize: pageSize.value
        }
    })

    /**
     * 更新表格数据
     */
    const updateTableData = () => {
        getFood(getFoodOption.value).then((res) => {
            if(res.data.code) {
                console.log(res);
                tableData.value = res.data.data.records;
                total.value = res.data.data.total;
            }
        })
    }

    updateTableData();

    /**
     * 批量删除按钮click事件
     */
    const onBatchDeleteFoodBtnClick = () => {
        const foodIdArray = multipleSelection.value.map((food) => {
            return food.id;
        });
        const idsStr = foodIdArray.join(",");
        // 调用批量删除菜品接口
        batchDeleteFood(idsStr).then((res) => {
            console.log(res);
            if(res.data.code) {
                
                ElMessage({
                    message: "批量删除成功",
                    type: "success"
                });
                // 更新表格数据
                updateTableData();
            } else {
                ElMessage({
                    message: res.data.msg,
                    type: "error"
                })
            }
        })
    }
    /**
     * 确定停售click
     */
    const onHaltTheSalesConfirmBtnClick = () => {
        setStatus(0, currentRow.value.id).then((res) => {
            if(res.data.code) {
                ElMessage({
                    message: "停售成功",
                    type: "success"
                })
                haltTheSalesConfirmDialogVisible.value = false;
                updateTableData();
            } else {
                ElMessage({
                    message: "停售失败",
                    type: "error"
                })
            }
        })
    }

    /**
     * 确定启售click
     */
    const onStartSalesConfirmBtnClick = () => {
        setStatus(1, currentRow.value.id).then((res) => {
            if(res.data.code) {
                ElMessage({
                    message: "启售成功",
                    type: "success"
                })
                startSalesConfirmDialogVisible.value = false;
                updateTableData();
            } else {
                ElMessage({
                    message: "启售失败",
                    type: "error"
                })
            }
        })
    }

    /**
     * 删除click
     */
    const onDeleteSalesConfirmBtnClick = () => {
        batchDeleteFood(currentRow.value.id).then((res) => {
            if(res.data.code) {
                ElMessage({
                    message: "删除成功",
                    type: "success"
                })
                deleteSalesConfirmDialogVisible.value = false;
                updateTableData();
            } else {
                ElMessage({
                    message: res.data.msg,
                    type: "error"
                })
            }
        })
    }

    /**
     * 新增菜品成功事件
     */
    const onAddFoodAdded = () => {
        AddFoodDialogVisible.value = false;
        updateTableData();
    }

    /**
     * 修改菜品成功事件
     */
    const onEditFoodSaved = () => {
        editFoodDialogVisible.value = false;
        updateTableData();
    }

    return {
        // search
        foodName,
        foodCategoryId,
        foodCategoryIdOptions,
        salesStatus,
        salesOptions,
        categoryIdAndCategoryMap,

        // table
        tableData,
        multipleSelection,
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

        // 分页部分
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
    }
}