import { ENV } from "@/constants/env";
import { db } from "@/lib/appwrite";
import { handleReturnItems } from "@/store/slices/userOrderSlice";
import { order, orderCartProduct } from "@/types/slices/ordersSlice";
import transferFee from "@/utils/transferFee";
import { Dispatch } from "@reduxjs/toolkit";
import { navigate } from "expo-router/build/global-state/routing";

export const handleConfirmReturn = async ({orderId, order, returnItems, boughtItems, dispatch}: {orderId: string | null, order: order | null, returnItems: orderCartProduct[], boughtItems: orderCartProduct[], dispatch: Dispatch}) => {
    if (orderId && order) {
      try {
        const returnedPrice = returnItems.reduce((acc, item) => acc + Number(item.price) * Number(item.stock), 0);
        const returnedString = returnItems.map((item) => JSON.stringify(item));
        const boughtString = boughtItems.map((item) => JSON.stringify(item));

        const total = (Number(order.totalPrice) - returnedPrice).toString();
        const returnMoney = (returnedPrice - transferFee(returnedPrice)).toString();

        await db.updateDocument(
          ENV.DB_ID,
          ENV.DB_ORDERS_COL_ID,
          orderId,
          {
            returnedPrice: returnMoney,
            totalPrice: total,
            returnedProducts: returnedString,
            cartProducts: boughtString,
          }
        );
        
        navigate('/orders');
        dispatch(handleReturnItems({ orderId, returnedProducts: returnItems, returnedPrice: returnMoney, cartProducts: boughtItems, totalPrice: total}));
      } catch (error) {
        console.error("Failed to confirm return:", error);
      }
    }
}