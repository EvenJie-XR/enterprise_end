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
    offlinePrice: number | null,
    originalPrice: number | null,
    price: number,
    status: number,
    flavors: { // 口味
        name: string, // 口味名称
        value: string, // 口味值数组的json字符串
    }[],
    specifications: {
        name: string,
        value: string // 规格值数组的json字符串
    }[]
}

// 新增菜品参数
export type EditFoodOption = {
    categoryId: number | string,
    description: string,
    image: string,
    name: string,
    offlinePrice: number | null,
    originalPrice: number | null,
    price: number,
    status: number,
    id: number,
    flavors: { // 口味
        name: string, // 口味名称
        value: string, // 口味值数组的json字符串
    }[],
    specifications: {
        name: string,
        value: string // 规格值数组的json字符串
    }[]
}