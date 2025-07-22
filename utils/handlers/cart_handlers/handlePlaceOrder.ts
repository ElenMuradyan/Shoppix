import { ENV } from "@/constants/env";
import { db } from "@/lib/appwrite";
import { setCartItems } from "@/store/slices/cartItemsSlice";
import { addUserOrder } from "@/store/slices/userOrderSlice";
import { addOrder, setCartItemIds } from "@/store/slices/userSlice";
import { handlePlaceOrderInterface } from "@/types/handlePlaceOrder";
import { cartProduct } from "@/types/slices/cartItemsSlice";
import { order } from "@/types/slices/ordersSlice";
import { orderStatuses } from "@/utils/orderStatuses";
import { ID } from "react-native-appwrite";

export const handlePlaceOrder = async ({values, userData, setLoading, cartItems, dispatch}: handlePlaceOrderInterface) => {
    if(userData){
      try{
        setLoading(true);
        const orderedProducts: cartProduct[] = [];
        const notOrderedProducts: cartProduct[] = [];

        for(let item of cartItems){
          if(item.ordering){
            orderedProducts.push(item);
          }else{
            notOrderedProducts.push(item);
          }
        }

        const notOrderedProductIds = notOrderedProducts.map((item) => item.cartItemId);

        const cartStringProducts: string[] = orderedProducts.map((item) => {
          return JSON.stringify({
                productId: item.productId,
                cartItemId: item.cartItemId,
                image: item.image,
                options: item.options,
                stock: item.stock,
                price: item.price,
                name: item.name,
          })
        })
        const cartProducts: string[] = cartStringProducts.map((item) => JSON.parse(item))

        for (const item of orderedProducts) {
            await db.deleteDocument(
              ENV.DB_ID,
              ENV.DB_CART_ITEMS_COL_ID,
              item.cartItemId
            );
        }

        const totalPrice = orderedProducts.reduce(
          (acc, item) => acc + Number(item.price) * Number(item.stock),
          0
        );
        const orderID = ID.unique();

        const orderDetails = {
          id: orderID,
          address: JSON.stringify(values),
          cartProducts: cartStringProducts,
          totalPrice: totalPrice.toString(),
          status: Object.keys(orderStatuses)[0],
          userPhone: userData.phone,
          userName: `${userData.firstName} ${userData.lastName}`,
          userEmail: userData.email,
          userId: userData.ID,
        };
  
        await db.createDocument(
            ENV.DB_ID,
            ENV.DB_ORDERS_COL_ID,
            orderID,
            orderDetails,
        );

        await db.updateDocument(
            ENV.DB_ID,
            ENV.DB_USERS_COL_ID,
            userData.ID,
            {
              orders: [...userData.orders, orderID],
              cartItems: [...notOrderedProductIds]
            }
        );

        dispatch(addOrder(orderID));
        dispatch(addUserOrder({
          ...orderDetails,
          address: values,
          cartProducts: cartProducts,
        }));
        
        dispatch(setCartItemIds(notOrderedProductIds));
        dispatch(setCartItems(notOrderedProducts));

        console.log("Orders have been successfully placed!");
      } catch (error: any) {
        console.error("Order processing failed:", error.message);
      } finally {
        setLoading(false);
      }
}};