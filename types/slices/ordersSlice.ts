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
    userEmail: string,
    userId: string
};

export interface orderCartProduct {
    productId: string,
    cartItemId: string,
    image: string,
    options: optionType[],
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