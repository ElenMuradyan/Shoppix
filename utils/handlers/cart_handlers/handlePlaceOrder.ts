import { ENV } from "@/constants/env";
import { db } from "@/lib/appwrite";
import { setCartItems } from "@/store/slices/cartItemsSlice";
import { addUserOrder } from "@/store/slices/userOrderSlice";
import { addOrder, setCartItemIds } from "@/store/slices/userSlice";
import { handlePlaceOrderInterface } from "@/types/handlePlaceOrder";
import { cartProduct } from "@/types/slices/cartItemsSlice";
import { orderStatuses } from "@/constants/orderStatuses";
import { ID } from "react-native-appwrite";
import { orderCartProduct } from "@/types/slices/ordersSlice";
import transferFee from "@/utils/transferFee";
import { navigate } from "expo-router/build/global-state/routing";

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
                returnable: item.returnable,
                name: item.name,
          })
        })
        const cartProducts: orderCartProduct[] = cartStringProducts.map((item) => JSON.parse(item));

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
        const fee = transferFee(totalPrice);
        const orderID = ID.unique();

        const orderDetails = {
          id: orderID,
          address: JSON.stringify(values),
          cartProducts: cartStringProducts,
          totalPrice: (totalPrice + fee).toString(),
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
          date: Date.now().toLocaleString(),
          returnedPrice: 0,
          returnedProducts: [],
        }));

        dispatch(setCartItemIds(notOrderedProductIds));
        dispatch(setCartItems(notOrderedProducts));
        navigate(`/orders`)
        console.log("Orders have been successfully placed!");
      } catch (error: any) {
        console.error("Order processing failed:", error.message);
      } finally {
        setLoading(false);
      }
}};