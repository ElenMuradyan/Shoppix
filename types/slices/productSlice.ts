import { optionType } from "../Product/ProductItemProps"

export type myProductsSliceType = {
    loading: boolean,
    myProducts: product[],
}

export type productsSliceType = {
    loading: boolean,
    products: product[],
}

export type product = {
    id: string, 
    images: string[], 
    name: string,
    price: number,
    description: string,
    category: string, 
    subCategory: string,
    stock: number,
    usedType: string,
    autor: string,
    returnType: boolean,
    options?: optionType[],
}

export type productInitialValue = {
    loading: boolean,
    productInfo: product | null
}

// export interface productInterface {
//     id: string,
//     name: string,
//     price: number,
//     description: string,
//     autor: string,
//     images: string[],
//     category: string,
//     subCategory: string,
//     stock: number,
//     usedType: string,
//     options?: optionType[],
// }

// export type optionType = {
//     optionName: string,
//     optionValue: string[],
// }

// export interface cartProduct {
//     autor: string,
//     productId: string,
//     cartItemId: string,
//     name: string,
//     price: number,
//     image: string,
//     stock: number,
//     maxValue: number,
//     index: number,
//     ordering: boolean,
//     options?: optionType[],
// }