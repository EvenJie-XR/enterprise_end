import { instance } from ".";
import { QueryCategoryManagerOption } from "../types/page/CategoryManagerTypes";

/**
 * 查询分类
 * @param option 参数
 * @returns 
 */
export const queryCategory = (option: QueryCategoryManagerOption) => instance.get(`/api/admin/category/page?name=${option.name}&page=${option.page}&pageSize=${option.pageSize}&type=1`);

/**
 * 添加分类
 * @param categoryName 分类名
 * @param sort 排序编号
 * @returns 
 */
export const addCategory = (categoryName: string, sort: number) => instance.post(`/api/admin/category`, {
    name: categoryName,
    sort,
    type: 1
})

/**
 * 删除分类
 * @param id 分类id
 * @returns 
 */
export const deleteCategory = (id: number) => instance.delete(`/api/admin/category?id=${id}`);

/**
 * 启用或禁用分类
 * @param id 分类id
 * @param status 分类状态
 * @returns 
 */
export const enableOrDiableCategory = (id: string, status: number) => instance.post(`/api/admin/category/status/${status}?id=${id}`);

/**
 * 设置分类
 * @param id 分类id
 * @param name 分类名字
 * @param sort 分类排序
 * @returns 
 */
export const setCategory = (id: string, name: string, sort: number) => instance.put("/api/admin/category", {
    id,
    name,
    sort,
    type: 1
})