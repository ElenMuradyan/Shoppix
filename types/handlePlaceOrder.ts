import { Dispatch } from "@reduxjs/toolkit";
import { address, userDataType } from "./slices/userSlice";
import { cartProduct } from "./slices/cartItemsSlice";

export interface handlePlaceOrderInterface {
    values: address,
    userData: userDataType | null, 
    setLoading: (loading: boolean) => void, 
    cartItems: cartProduct[], 
    dispatch: Dispatch, 
}