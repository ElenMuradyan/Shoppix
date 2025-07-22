import { optionType } from "../Product/ProductItemProps";

export interface cartProduct {
    productId: string,
    cartItemId: string,
    image: string,
    ordering: boolean,
    options: optionType[],
    stock: string,
    price: string,
    name: string,
    userID: string,
    returnable: boolean;
    index?: number,
}

export type cartItemsSliceType = {
    loading: boolean,
    cartItems: cartProduct[],
}