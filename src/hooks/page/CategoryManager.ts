import { Ref, onMounted, ref } from "vue";
import { deleteCategory, enableOrDiableCategory, queryCategory } from "../../api/CategoryManager";
import { ElMessage } from "element-plus";

/**
 * 搜索分类部分
 * @returns 
 */
const useSearchCategory = () => {
    // 菜品名称
    const categoryName = ref("");
    return {
        categoryName,
    }
}

/**
 * 表格部分
 * @returns 
 */
const useTable = () => {
    const tableData: Ref<any[]> = ref([]);
    const currentRow: Ref<any> = ref();
    const deleteCategoryConfirmDialogVisible = ref(false);
    const disableCategoryConfirmDialogVisible = ref(false);
    const enableCategoryConfirmDialogVisible = ref(false);
    const setCategoryDialogVisible = ref(false);
    /**
     * 删除按钮click事件
     * @param row 
     */
    const onDeleteBtnClick = (row: any) => {
        currentRow.value = row;
        deleteCategoryConfirmDialogVisible.value = true;
    }
    /**
     * 禁用按钮click事件
     * @param row 
     */
    const onDisableBtnClick = (row: any) => {
        currentRow.value = row;
        disableCategoryConfirmDialogVisible.value = true;
    }
    /**
     * 启用按钮click事件
     * @param row 
     */
    const onEnableBtnClick = (row: any) => {
        currentRow.value = row;
        enableCategoryConfirmDialogVisible.value = true;
    }
    const onSetBtnClick = (row: any) => {
        currentRow.value = row;
        setCategoryDialogVisible.value = true;
    }
    return {
        tableData,
        currentRow,
        onDeleteBtnClick,
        deleteCategoryConfirmDialogVisible,
        disableCategoryConfirmDialogVisible,
        onDisableBtnClick,
        enableCategoryConfirmDialogVisible,
        onEnableBtnClick,
        setCategoryDialogVisible,
        onSetBtnClick
    }
}

/**
 * 分页部分
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
 * 分类管理
 * @returns 
 */
export const useCategoryManager = () => {
    const { categoryName } = useSearchCategory();
    const { tableData, currentRow, onDeleteBtnClick, deleteCategoryConfirmDialogVisible, disableCategoryConfirmDialogVisible, onDisableBtnClick, enableCategoryConfirmDialogVisible, onEnableBtnClick, setCategoryDialogVisible, onSetBtnClick } = useTable();
    const { currentPage, pageSize, total } = usePagination();
    // 添加分类dislog可视性
    const addCategoryManagerDiaLogVisible = ref(false);

    onMounted(() => {
        updateCategoryTableData();
    })

    /**
     * 添加分类click事件
     */
    const onAddCategoryBtnClick = () => {
        addCategoryManagerDiaLogVisible.value = true;
    }
    /**
     * 新增分类saved事件
     */
    const onAddCategorySaved = (close: boolean) => {
        updateCategoryTableData();
        if(close) addCategoryManagerDiaLogVisible.value = false;
    }

    /**
     * 更新分类表格数据
     */
    const updateCategoryTableData = () => {
        queryCategory({
            name: categoryName.value,
            page: currentPage.value,
            pageSize: pageSize.value
        }).then((res) => {
            if(res.data.code) {
                console.log(res);
                tableData.value = res.data.data.records;
                total.value = res.data.data.total;
            } else {
                ElMessage({
                    message: "获取分类失败",
                    type: "error"
                })
            }
        })
    }

    /**
     * 删除确认按钮click事件
     */
    const onDeleteConfirmBtnClick = () => {
        deleteCategory(currentRow.value.id).then((res) => {
            if(res.data.code) {
                ElMessage({
                    message: "删除分类成功",
                    type: "success"
                })
                deleteCategoryConfirmDialogVisible.value = false;
                updateCategoryTableData();
            } else {
                ElMessage({
                    message: "删除分类失败，有已绑定菜品，请先处理已绑定菜品",
                    type: "error"
                })
            }
        })
    }

    /**
     * 设置分类状态
     * @param status 状态 1为启用 0为禁用
     */
    const setCategoryStatus = (status: number) => {
        enableOrDiableCategory(currentRow.value.id, status).then((res) => {
            if(res.data.code) {
                if(status) {
                    ElMessage({
                        message: "启用分类成功",
                        type: "success"
                    })
                    enableCategoryConfirmDialogVisible.value = false;
                } else {
                    ElMessage({
                        message: "禁用分类成功",
                        type: "success"
                    })
                    disableCategoryConfirmDialogVisible.value = false;
                }
                updateCategoryTableData();
            } else {
                ElMessage({
                    message: "操作失败",
                    type: "error"
                })
            }
        })
    }

    /**
     * 当设置分类setted事件
     */
    const onSetCategorySetted = () => {
        setCategoryDialogVisible.value = false;
        updateCategoryTableData();
    }

    return {
        categoryName,
        tableData,
        currentPage,
        pageSize,
        total,
        updateCategoryTableData,
        addCategoryManagerDiaLogVisible,
        onAddCategoryBtnClick,
        onAddCategorySaved,
        onDeleteBtnClick,
        deleteCategoryConfirmDialogVisible,
        onDeleteConfirmBtnClick,
        disableCategoryConfirmDialogVisible,
        onDisableBtnClick,
        setCategoryStatus,
        enableCategoryConfirmDialogVisible,
        onEnableBtnClick,
        currentRow,
        setCategoryDialogVisible,
        onSetBtnClick,
        onSetCategorySetted
    }
}
