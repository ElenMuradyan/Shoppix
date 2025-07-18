import { Dispatch } from "@reduxjs/toolkit";
import { userDataType } from "./slices/userSlice";
import { AppDispatch } from "@/store/store";
import { cartProduct } from "./slices/cartItemsSlice";

export interface handleDeleteCartItemInterface {
    ordering?: boolean,
    cartItemId: string,
    dispatch: Dispatch,
    appDispatch?: AppDispatch,
    userData: userDataType | null,
    index?: number,
    cart?: cartProduct[]
}