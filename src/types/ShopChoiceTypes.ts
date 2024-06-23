export type ShopApplicationType = {
    name: string,
    shopImage: string,
    certificate: string,
    legalPersonName: string,
    idNumber: string,
    phone: string,
}
export type ShopDetailType = {
    account: string,
    id: string,
    name: string,
    shopImage: string,
    status: string,
}
export type ChoseShopDetailType = {
    staffId?: string,
    shopId?: string,
    shopName?: string,
    token?: string,
    needPassword?: string,
}