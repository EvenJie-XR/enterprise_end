/**
 * 获取菜品参数
 */
export type GetFoodOption = {
    categoryId: number | string,
    name: string,
    page: number,
    pageSize: number,
    status: number | string
}

// 新增菜品参数
export type AddFoodOption = {
    categoryId: number | string,
    description: string,
    image: string,
    name: string,
    price: number,
    status: number
}

// 新增菜品参数
export type EditFoodOption = {
    categoryId: number | string,
    description: string,
    image: string,
    name: string,
    price: number,
    status: number,
    id: number
}