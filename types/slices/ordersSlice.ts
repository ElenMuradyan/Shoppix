import { optionType, orderedProductInfo } from "../Product/ProductItemProps";
import { cartProduct } from "./cartItemsSlice";
import { address } from "./userSlice";

export type order = {
    id: string,
    address: address,
    status: string,
    cartProducts: orderCartProduct[],
    totalPrice: string,
    userName: string,
    userPhone: string,
    date: string,
    userEmail: string,
    userId: string,
    returnedPrice: string,
    returnedProducts: orderCartProduct[],
    returnedItemsDetails?: returnedItemsType | null,
};

export interface orderCartProduct {
    productId: string,
    cartItemId: string,
    image: string,
    options: optionType[],
    returnable: boolean;
    stock: string,
    price: string,
    name: string,
}

export type returnedItemsType = {
    products: cartProduct[],
    returnPrice: number,
    consumerId: string,
    sellerId: string,
    confirmedReturn: boolean,
};

export type returnDetails = {
    order: order,
    orderStatusesArray: string[],
    index: number,
    returnAbleProducts: cartProduct[],
}

export type userOrdersSlice = {
    userOrders: order[],
    loading: boolean,
}