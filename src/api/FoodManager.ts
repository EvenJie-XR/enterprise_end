import { instance } from ".";
import { AddFoodOption, EditFoodOption, GetFoodOption } from "../types/page/FoodManager";

/**
 * 获取菜品列表
 * @param option 
 * @returns 
 */
export const getFood = (option: GetFoodOption) => instance.get(`/api/admin/dish/page?categoryId=${option.categoryId}&name=${option.name}&page=${option.page}&pageSize=${option.pageSize}&status=${option.status}`);

/**
 * 获取所有分类
 * @returns 
 */
export const getAllCategory = () => instance.get(`/api/admin/category/page?name=&page=1&pageSize=10000&type=`);

/**
 * 批量删除菜品
 * @param ids 需要批量删除的菜品的id组成的字符串
 * @returns 
 */
export const batchDeleteFood = (ids: string) => instance.delete(`/api/admin/dish?ids=${ids}`);

/**
 * 启售、停售
 * @param status 
 * @param id 
 * @returns 
 */
export const setStatus = (status: number, id: number) => instance.post(`/api/admin/dish/status/${status}`, {
    id
});

/**
 * 文件上传
 * @param file 文件数据
 * @returns 
 */
export const uploadFile = (file: File) => instance.post(`/api/admin/common/upload`, {
    file
}, {
    headers: {
        'Content-Type': "multipart/form-data"
    }
})

/**
 * 新增菜品
 * @param option 
 * @returns 
 */
export const addFood = (option: AddFoodOption) => instance.post(`/api/admin/dish`, {
    categoryId: option.categoryId,
    description: option.description,
    image: option.image,
    name: option.name,
    price: option.price,
    status: option.status
})

/**
 * 修改菜品
 * @param option 菜品参数
 * @returns 
 */
export const editFood = (option: EditFoodOption) => instance.put(`/api/admin/dish`, {
    categoryId: option.categoryId,
    description: option.description,
    image: option.image,
    name: option.name,
    price: option.price,
    status: option.status,
    id: option.id
})