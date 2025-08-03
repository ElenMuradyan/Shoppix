import { ProductItemProps } from "../Product/ProductItemProps"

export type myProductsSliceType = {
    loading: boolean,
    myProducts: ProductItemProps[],
}

export type productsSliceType = {
    loading: boolean,
    products: ProductItemProps[],
    productNames: string[],
}

export type productInitialValue = {
    loading: boolean,
    productInfo: ProductItemProps | null
}