<template>
    <el-dialog align-center id="print-order-device-dialog-container" title="打印机设备管理">
        <el-button style="margin-bottom: 10px" @click="onAddPrintOrderDeviceBtnClick">添加打印机设备</el-button>
        <el-table :data="tableData" style="width: 100%" border>
            <el-table-column prop="printerId" label="编号" />
            <el-table-column prop="key" label="识别码" />
            <el-table-column prop="phoneNum" label="流量卡号码" />
            <el-table-column prop="remark" label="备注" />
            <el-table-column label="操作">
                <template #default="{row}">
                    <el-button type="success" text @click="onEditPrintOrderBtnClick(row)">修改</el-button>
                    <el-button type="danger" text @click="onDeletePrintOrderBtnClick(row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-dialog align-center v-model="addPrintOrderDeviceDialogVisible" id="add-print-order-device-dialog-container" title="添加打印机设备">
            <el-form :model="form" label-position="left" label-width="100px" ref="formRef" :rules="rules">
                <el-form-item label="设备编号:" prop="printerId">
                    <el-input v-model="form.printerId" placeholder="请输入设备编号..." />
                </el-form-item>
                <el-form-item label="设备识别码:" prop="key">
                    <el-input v-model="form.key" placeholder="请输入设备识别码..." />
                </el-form-item>
                <el-form-item label="流量卡号码:" prop="phoneNum">
                    <el-input v-model="form.phoneNum" placeholder="请输入流量卡号码..." />
                </el-form-item>
                <el-form-item label="备注:" prop="remark">
                    <el-input v-model="form.remark" placeholder="请输入备注..." />
                </el-form-item>
                <el-form-item>
                    <el-button color="#28A767" @click="onAddPrintOrderBtnClick">添加</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
        <ConfirmDialog v-model="deleteConfirmDialogVisible" tip="确认删除当前打印机设备绑定吗?" btn-text="确认删除" @confirm="onDeletePrintOrderConfirmBtnClick" />
        <el-dialog align-center v-model="editPrintOrderDeviceDialogVisible" id="edit-print-order-device-dialog-container" title="修改打印机设备信息" @open="onEditPrintOrderDeviceDialogOpen" @close="onEditPrintOrderDeviceDialogClose">
            <el-form :model="editForm" label-position="left" label-width="100px" ref="editFormRef" :rules="editRules">
                <el-form-item label="流量卡号码:" prop="phoneNum">
                    <el-input v-model="editForm.phoneNum" placeholder="请输入流量卡号码..." />
                </el-form-item>
                <el-form-item label="备注:" prop="remark">
                    <el-input v-model="editForm.remark" placeholder="请输入备注..." />
                </el-form-item>
                <el-form-item>
                    <el-button color="#28A767" @click="onEditSaveBtnClick">修改</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
    </el-dialog>
</template>
<script lang="ts" setup>
import { ElMessage, FormInstance, FormRules } from 'element-plus';
import { addPrintOrderDevice, deletePrintOrderDevice, editPrintOrderDevice, getPrintOrderDevicesInfo } from '../../api/Header';
import { Ref, reactive, ref } from 'vue';
import ConfirmDialog from '../common/ConfirmDialog.vue';

// 打印机设备列表
const tableData = ref([]) as Ref<any[]>
// 获取打印机设备列表
const updateTableData = () => {
    getPrintOrderDevicesInfo().then((res) => {
        if(res.data.code) {
            tableData.value = res.data.data;
        } else {
            ElMessage({
                message: "获取打印机信息失败",
                type: "error"
            })
        }
    })
}
// 一进来就获取打印机设备列表
updateTableData();
const currentRow = ref<any>();
const deleteConfirmDialogVisible = ref(false);
// 删除打印设备按钮click
const onDeletePrintOrderBtnClick = (row: any) => {
    currentRow.value = row;
    deleteConfirmDialogVisible.value = true;
}
// 删除打印设备确认按钮click
const onDeletePrintOrderConfirmBtnClick = () => {
    deletePrintOrderDevice(currentRow.value.printerId).then((res) => {
        if(res.data.code) {
            ElMessage({
                message: "删除成功",
                type: "success"
            })
            deleteConfirmDialogVisible.value = false;
            updateTableData();
        } else {
            ElMessage({
                message: "删除失败",
                type: "error"
            })
        }
    });
}
const editPrintOrderDeviceDialogVisible = ref(false);
const onEditPrintOrderBtnClick = (row: any) => {
    currentRow.value = row;
    editPrintOrderDeviceDialogVisible.value = true;
}


// 添加打印机设备对话框visible
const addPrintOrderDeviceDialogVisible = ref(false);
// 添加打印机设备按钮click事件
const onAddPrintOrderDeviceBtnClick = () => {
    addPrintOrderDeviceDialogVisible.value = true;
}
const form = reactive({
    printerId: "",
    key: "",
    phoneNum: "",
    remark: ""
})
const resetForm = () => {
    form.printerId = '';
    form.key = '';
    form.phoneNum = '';
    form.remark = '';
}
const formRef = ref<FormInstance>();
const rules = reactive<FormRules<typeof form>>({
    printerId: [{ required: true, trigger: 'blur', message: "设备编号不能为空" }],
    key: [{ required: true, trigger: 'blur', message: "设备识别码不能为空" }],
    phoneNum: [{ required: true, trigger: 'blur', message: "流量卡号码不能为空" }],
    remark: [{ required: true, trigger: 'blur', message: "备注不能为空" }],
})
// 添加打印机设备按钮click
const onAddPrintOrderBtnClick = () => {
    formRef.value?.validate((success) => {
        if(success) {
            addPrintOrderDevice({
                printerId: form.printerId,
                key: form.key,
                phoneNum: form.phoneNum,
                remark: form.remark
            }).then((res) => {
                if(res.data.code) {
                    ElMessage({
                        message: "打印设备添加成功",
                        type: "success"
                    })
                    addPrintOrderDeviceDialogVisible.value = false;
                    updateTableData();
                    resetForm();
                } else {
                    ElMessage({
                        message: "打印设备添加失败,请检查打印机设备信息是否正确",
                        type: "error"
                    })
                }
            })
        }
    })
}


const editForm = reactive({
    phoneNum: "",
    remark: ""
})
const editRules = reactive<FormRules<typeof editForm>>({
    phoneNum: [{ required: true, trigger: 'blur', message: "流量卡号码不能为空" }],
    remark: [{ required: true, trigger: 'blur', message: "备注不能为空" }],
})
const editFormRef = ref<FormInstance>();
const onEditPrintOrderDeviceDialogOpen = () => {
    editForm.phoneNum = currentRow.value.phoneNum;
    editForm.remark = currentRow.value.remark;
}
const resetEditForm = () => {
    editForm.phoneNum = '';
    editForm.remark = '';
}
const onEditPrintOrderDeviceDialogClose = () => {
    resetEditForm();
}
const onEditSaveBtnClick = () => {
    editFormRef.value?.validate((success) => {
        if(success) {
            editPrintOrderDevice({
                printerId: currentRow.value.printerId,
                phoneNum: editForm.phoneNum,
                remark: editForm.remark
            }).then((res) => {
                if(res.data.code) {
                    ElMessage({
                        message: "修改打印机设备信息成功",
                        type: "success"
                    })
                } else {
                    ElMessage({
                        message: "修改打印机设备信息失败",
                        type: "error"
                    })
                }
            })
        }
    })
}
</script>

<style lang="scss">
    #print-order-device-dialog-container {
        width: 90vw;
    }
    #add-print-order-device-dialog-container {
        width: 60vw;
    }
    #edit-print-order-device-dialog-container {
        width: 60vw;
    }
    // 手机端竖屏
    @media screen and (max-width: 1024px) {
        #add-print-order-device-dialog-container {
            width: 90vw;
        }
        #edit-print-order-device-dialog-container {
            width: 90vw;
        }
    }
</style>
<style lang="scss" scoped>
//
</style>
