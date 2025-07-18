import { optionType } from "../Product/ProductItemProps";

export interface cartProduct {
    productId: string,
    stock: string,
    options: optionType[],
    price: string,
    image: string,
    name: string,
    cartItemId: string,
    maxStock: string,
    ordering: boolean,
    index?: number,
}

export type cartItemsSliceType = {
    loading: boolean,
    cartItems: cartProduct[],
}