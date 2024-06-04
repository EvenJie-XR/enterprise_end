<template>
    <el-dialog align-center id="add-food-dialog-container" title="新增菜品" @close="onClose">
        <el-scrollbar max-height="60vh">
            <el-form label-position="left" label-width="118px" :model="form" ref="formRef" :rules="rules">
                <el-form-item label="菜品名称:" prop="name">
                    <el-input v-model="form.name" placeholder="请输入菜品名称..." />
                </el-form-item>
                <el-form-item label="菜品分类:" prop="category">
                    <el-select v-model="form.category" filterable class="m-2" placeholder="请选择菜品分类...">
                        <el-option v-for="item in categoryOptions" :key="item.id" :label="item.name" :value="item.id" />
                    </el-select>
                </el-form-item>
                <el-form-item label="菜品描述:" prop="description">
                    <el-input v-model="form.description" :autosize="{ minRows: 2, maxRows: 4 }" type="textarea"
                        placeholder="请输入菜品描述..." />
                </el-form-item>
                <el-form-item label="口味描述:" prop="tasteList">
                    <div class="taste-container">
                        <div class="taste-header-container">
                            <el-button color="#28A767" @click="onAddTasteBtnClick">新增口味描述</el-button>
                        </div>
                        <!-- 口味列表 -->
                        <el-scrollbar class="taste-list-container" max-height="240px">
                            <!-- 口味item -->
                            <div class="taste-item-container" v-for="(tasteItem, index) in form.tasteList" :key="index">
                                <!-- 口味名称 -->
                                <div>
                                    <span>口味名称:</span>
                                    <el-input v-model="tasteItem.tasteName" placeholder="请输入口味名称..." class="input" />
                                </div>
                                <!-- 口味值列表 -->
                                <div class="taste-value-list-container">
                                    <div class="taste-value-list-header-container">
                                        <span>口味值列表:</span>
                                        <el-button color="#28A767" @click="onAddTasteValueBtnClick(tasteItem)" size="small">新增口味值</el-button>
                                    </div>
                                    <div class="taste-value-list-item-container" v-for="(_value, index) in tasteItem.tasteValueArray" :key="index">
                                        <!-- 口味值 -->
                                        <el-input v-model="tasteItem.tasteValueArray[index]" placeholder="请输入口味值..." class="input" />
                                        <el-button type="danger" size="small" class="btn" @click="onDeleteTasteValueOfTasteItem(tasteItem.tasteValueArray, index)">删除</el-button>
                                    </div>
                                </div>
                                <hr/>
                                <el-button type="danger" @click="onDeleteTasteItemOfTasteListByTasteItemIndex(form.tasteList, index)" style="width: 100%;">删除当前口味项</el-button>
                            </div>
                        </el-scrollbar>
                    </div>
                </el-form-item>
                <el-form-item label="菜品规格:" prop="specificationList">
                    <div class="specification-container">
                        <!-- 规格头部 -->
                        <div class="specification-header-container">
                            <el-button color="#28A767" @click="onAddSpecificationBtnClick">新增菜品规格</el-button>
                        </div>
                        <!-- 规格列表 -->
                        <el-scrollbar class="specification-content-container" max-height="240px">
                            <!-- 规格项 -->
                            <div class="specification-item-container" v-for="(specificationItem, index) in form.specificationList" :key="index">
                                <!-- 规格项名称 -->
                                <div class="specification-item-name-container">
                                    <span>规格项名称:</span>
                                    <el-input v-model="specificationItem.specificationName" placeholder="请输入规格项名称..." class="input" />
                                </div>
                                <div class="specification-item-valueHeader">
                                    <span>规格项值列表:</span>
                                    <el-button color="#28A767" size="small" @click="onAddSpecificationValueInSpecificationItemBtnClick(specificationItem.specificationValueList)">新增规格值</el-button>
                                </div>
                                <!-- 规格项值 -->
                                <div class="specification-item-valueList-container">
                                    <div class="valueList-item-container" v-for="(specificationValue, index) in specificationItem.specificationValueList" :key="index">
                                        <!-- 规格项值-名字 -->
                                        <div class="valueList-item-name-container">
                                            <span>规格名称:</span>
                                            <el-input v-model="specificationValue.valueName" placeholder="请输入规格名称..." class="input" />
                                        </div>
                                        <!-- 规格项值-线下价格 -->
                                        <div class="valueList-item-price-container">
                                            <span>规格线下价格:</span>
                                            <el-input-number v-model="specificationValue.offlinePrice" placeholder="请输入规格线下价格..." class="input" />
                                        </div>
                                        <!-- 规格项值-原价 -->
                                        <div class="valueList-item-price-container">
                                            <span>规格原价:</span>
                                            <el-input-number v-model="specificationValue.originalPrice" placeholder="请输入规格原价..." class="input" />
                                        </div>
                                        <!-- 规格项值-价格 -->
                                        <div class="valueList-item-price-container">
                                            <span>规格价格:</span>
                                            <el-input-number v-model="specificationValue.price" placeholder="请输入规格价格..." class="input" />
                                        </div>
                                        <hr/>
                                        <el-button type="danger" size="small" @click="onDeleteSpecificationValueBtnClick(specificationItem.specificationValueList, index)" style="width: 100%;">删除</el-button>
                                    </div>
                                </div>
                                <hr />
                                <el-button type="danger" @click="onDeleteSpecificationBtnClick(form.specificationList, index)" style="width: 100%;">删除</el-button>
                            </div>
                        </el-scrollbar>
                    </div>
                </el-form-item>
                注：线下价格，菜品原价 = 菜品价格 (默认)
                <br><br>
                <el-form-item label="线下价格:" prop="offlinePrice">
                    <el-input-number v-model="form.offlinePrice" :min="0" />
                </el-form-item>
                <el-form-item label="菜品原价:" prop="originalPrice">
                    <el-input-number v-model="form.originalPrice" :min="0" />
                </el-form-item>
                <el-form-item label="菜品价格:" prop="price">
                    <el-input-number v-model="form.price" :min="0" />
                </el-form-item>
                <el-form-item label="菜品启售状态:" prop="status">
                    <el-select v-model="form.status" class="m-2" placeholder="请选择菜品启售状态...">
                        <el-option v-for="item in statusOptions" :key="item.value" :label="item.label"
                            :value="item.value" />
                    </el-select>
                </el-form-item>
                <el-form-item label="菜品图片:" prop="image">
                    <el-upload list-type="picture-card" accept="image/*" :limit="1" v-model:file-list="fileList"
                        :http-request="onImageUpload">
                        <el-icon>
                            <Plus />
                        </el-icon>

                        <template #file="">
                            <div>
                                <el-image id="food-image-preview-btn" class="el-upload-list__item-thumbnail"
                                    :src="form.image" :preview-src-list="[form.image]" :preview-teleported="true"
                                    fit="cover" />
                                <span class="el-upload-list__item-actions">
                                    <span class="el-upload-list__item-preview" @click="handlePictureCardPreview()">
                                        <el-icon><zoom-in /></el-icon>
                                    </span>
                                    <span class="el-upload-list__item-delete" @click="handleRemove()">
                                        <el-icon>
                                            <Delete />
                                        </el-icon>
                                    </span>
                                </span>
                            </div>
                        </template>
                    </el-upload>
                </el-form-item>
                <el-form-item>
                    <el-button color="#28A767" @click="onAddBtnClick">新增菜品</el-button>
                </el-form-item>
            </el-form>
        </el-scrollbar>
    </el-dialog>
</template>
<script lang="ts" setup>
import { Ref, reactive, ref } from 'vue';
import { addFood, getAllCategory, uploadFile } from '../../api/FoodManager';
import { ElMessage, FormInstance, FormRules, UploadRequestOptions, UploadUserFile } from 'element-plus';

const formRef: Ref<FormInstance> = ref() as Ref<FormInstance>;

const emit = defineEmits(['added'])

const form = ref<{
    category: string,
    description: string,
    name: string,
    offlinePrice: number | null,
    originalPrice: number | null,
    price: number,
    status: number,
    image: string,
    tasteList: { // 口味列表
        tasteName: string, // 口味名称
        tasteValueArray: string[] // 口味值数组
    }[],
    specificationList: { // 规格列表
        specificationName: string, // 规格名字
        specificationValueList: {  // 规格值
            valueName: string, // 规格值名字
            offlinePrice: number, // 规格线下价格
            originalPrice: number, // 规格原价
            price: number // 规格价格
        }[]
    }[]
}>({
    category: "",
    description: "",
    name: "",
    offlinePrice: null,
    originalPrice: null,
    price: 0,
    status: 1,
    image: "",
    tasteList: [],
    specificationList: []
})
const rules = reactive<FormRules<typeof form>>({
    name: [{ required: true, trigger: 'blur', message: "名字不能为空" }],
    category: [{ required: true, trigger: 'blur', message: "分类不能为空" }],
    price: [{ required: true, trigger: 'blur', message: "价格不能为空" }],
    status: [{ required: true, trigger: 'blur', message: "状态不能为空" }],
    image: [{ required: true, trigger: 'blur', message: "图片不能为空" }],
    specificationList: [{ required: true, trigger: 'blur', message: "规格列表不能为空" }],
})
// 分类选项list
const categoryOptions: Ref<{ id: number, name: string }[]> = ref([]);
// 分类id和分类的对象
const categoryIdAndCategoryMap: Ref<any> = ref({});
// 获取所有分类放入分类选项列表提供选择
getAllCategory().then((res) => {
    if (res.data.code) {
        categoryOptions.value = res.data.data.records;
        // @ts-ignore
        form.value.category = categoryOptions.value[0].id;

        categoryOptions.value.forEach((foodCategory) => {
            categoryIdAndCategoryMap.value[foodCategory.id] = foodCategory.name;
        })
    }
})
const statusOptions = ref([
    {
        label: "启售",
        value: 1
    },
    {
        label: "停售",
        value: 0
    }
])
// 上传的文件列表（用来删除预览的图片）
const fileList: Ref<UploadUserFile[]> = ref([]);
const onImageUpload = (option: UploadRequestOptions) => {
    const formData = new FormData();
    formData.append('file', option.file)
    uploadFile(option.file).then((res) => {
        if (res.data.code) {
            ElMessage({
                message: "图片上传成功",
                type: "success"
            })
            form.value.image = res.data.data;
        } else {
            ElMessage({
                message: "图片上传失败",
                type: "error"
            })
        }
    }).catch(() => {
        ElMessage({
            message: "图片上传失败",
            type: "error"
        })
    })
}
const handlePictureCardPreview = () => {
    const el = document.getElementById("food-image-preview-btn");
    el?.click();
}
const handleRemove = () => {
    fileList.value.pop();
    form.value.image = "";
}
/**
 * 重置表单内容
 */
const resetForm = () => {
    form.value = {
        category: "",
        description: "",
        name: "",
        offlinePrice: null,
        originalPrice: null,
        price: 0,
        status: 1,
        image: "",
        tasteList: [],
        specificationList: []
    };
    fileList.value.pop();
}
const onAddBtnClick = () => {
    formRef.value.validate((valid) => {
        if (valid) {
            const specificationList = form.value.specificationList.map(specification => {
                return {
                    name: specification.specificationName,
                    value: JSON.stringify(specification.specificationValueList.map(value => {
                        return {
                            value: value.valueName,
                            offlinePrice: value.offlinePrice,
                            originalPrice: value.originalPrice,
                            price: value.price
                        }
                    }))
                }
            })
            const tasteList = form.value.tasteList.map(taste => {
                return {
                    name: taste.tasteName,
                    value: JSON.stringify(taste.tasteValueArray)
                }
            })
            console.log(form.value, specificationList, tasteList);
            addFood({
                categoryId: form.value.category,
                description: form.value.description,
                image: form.value.image,
                name: form.value.name,
                offlinePrice: form.value.offlinePrice,
                originalPrice: form.value.originalPrice,
                price: form.value.price,
                status: form.value.status,
                specifications: specificationList,
                flavors: tasteList
            }).then((res) => {
                if (res.data.code) {
                    ElMessage({
                        message: "新增菜品成功",
                        type: "success"
                    });
                    resetForm();
                    emit("added");
                } else {
                    ElMessage({
                        message: "新增菜品失败",
                        type: "error"
                    })
                }
            })
        } else {
            ElMessage({
                message: "所有内容不能为空",
                type: "error"
            })
        }
    })

}
const onClose = () => {
    resetForm();
}

// -----------------------------------------------------------------------口味---------------------------------------------------
/**
 * 添加口味按钮click
 */
const onAddTasteBtnClick = () => {
    form.value.tasteList.push({
        tasteName: '',
        tasteValueArray: ['']
    })
}
/**
 * 新增口味值按钮click
 */
const onAddTasteValueBtnClick = (tasteItem: { // 口味列表
    tasteName: string, // 口味名称
    tasteValueArray: string[] // 口味值数组
}) => {
    tasteItem.tasteValueArray.push('');
}
/**
 * 根据口味值下标删除口味值
 * @param tasteValueOfTaste 口味值数组
 * @param targetValueIndex 口味值下标
 */
const onDeleteTasteValueOfTasteItem = (tasteValueOfTaste: string[], targetValueIndex: number) => {
    // 删除当前下标的口味值
    tasteValueOfTaste.splice(targetValueIndex, 1);
}
/**
 * 删除口味项
 * @param tasteList 口味项列表
 * @param targetTasteItemIndex 口味项下标
 */
const onDeleteTasteItemOfTasteListByTasteItemIndex = (tasteList: { // 口味列表
    tasteName: string, // 口味名称
    tasteValueArray: string[] // 口味值数组
}[], targetTasteItemIndex: number) => {
    tasteList.splice(targetTasteItemIndex, 1);
}
// -----------------------------------------------------------------------------------------------------------------


// ----------------------------------------------------------规格---------------------------------------------------
/**
 * 添加菜品规格按钮click
 */
const onAddSpecificationBtnClick = () => {
    form.value.specificationList.push({
        specificationName: '',
        specificationValueList: [
            {
                valueName: '',
                offlinePrice: 0,
                originalPrice: 0,
                price: 0,
            }
        ]
    })
}
/**
 * 添加规格值到规格项中
 * @param valueList 规格项的值列表
 */
const onAddSpecificationValueInSpecificationItemBtnClick = (valueList: {  // 规格值
    valueName: string, // 规格值名字
    offlinePrice: number, // 规格线下价格
    originalPrice: number, // 规格原价
    price: number // 规格价格
}[]) => {
    valueList.push({
        valueName: '',
        offlinePrice: 0,
        originalPrice: 0,
        price: 0
    })
}
/**
 * 删除规格值
 * @param valueList 规格值数组
 * @param index 目标下标
 */
const onDeleteSpecificationValueBtnClick = (valueList: {  // 规格值
    valueName: string, // 规格值名字
    offlinePrice: number, // 规格线下价格
    originalPrice: number, // 规格原价
    price: number // 规格价格
}[], index: number) => {
    valueList.splice(index, 1);
}
/**
 * 删除规格
 * @param specificationList 规格列表
 * @param index 目标规格下标
 */
const onDeleteSpecificationBtnClick = (specificationList: { // 规格列表
        specificationName: string, // 规格名字
        specificationValueList: {  // 规格值
            valueName: string, // 规格值名字
            offlinePrice: number, // 规格线下价格
            originalPrice: number, // 规格原价
            price: number // 规格价格
        }[]
}[], index: number) => {
    specificationList.splice(index, 1);
}
// --------------------------------------------------------------------------------------------
</script>

<style lang="scss">
#add-food-dialog-container {
    width: 40vw;
}

// 手机端竖屏
@media screen and (max-width: 1024px) {
    #add-food-dialog-container {
        width: 90vw;
    }
}
</style>
<style lang="scss" scoped>
// 口味
.taste-container {
    width: 100%;

    .taste-header-container {
        display: flex;
        justify-content: flex-end;
        margin-bottom: 10px;
    }

    .taste-list-container {
        .taste-item-container {
            border: 1px solid #000000;
            border-radius: 8px;
            padding: 6px;
            margin-bottom: 10px;
            .taste-value-list-container {
                .taste-value-list-header-container {
                    display: flex;
                    justify-content: space-between;
                    margin: 10px 0px;
                    align-items: center;
                }
                .taste-value-list-item-container {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    .input {
                        width: 80%;
                    }
                    .btn {
                        width: 15%;
                    }
                }
            }
        }
    }
}
// 规格
.specification-container {
    width: 100%;
    // 规格-头部
    .specification-header-container {
        display: flex;
        justify-content: flex-end;
        margin-bottom: 10px;
    }
    // 规格-内容
    .specification-content-container {
        // 规格-内容-内容项
        .specification-item-container {
            border: 1px solid #000000;
            border-radius: 8px;
            padding: 6px;
            margin-bottom: 10px;
            // 规格项名字
            .specification-item-name-container {
                
            }
            // 规格项值的header
            .specification-item-valueHeader {
                margin-top: 10px;
                display: flex;
                align-items: center;
                justify-content: space-between;
            }
            // 规格值的valueList
            .specification-item-valueList-container {
                // valueList的item
                .valueList-item-container {
                    border: 1px solid #000000;
                    padding: 4px;
                    border-radius: 8px;
                    margin-bottom: 10px;
                    // 规格项名字
                    .valueList-item-name-container {
                        margin-bottom: 10px;
                    }
                    // 规格项名字
                    .valueList-item-price-container {
                        display: flex;
                        justify-content: space-between;
                        flex-wrap: wrap;
                    }
                }
            }
        }
    }
}
</style>
