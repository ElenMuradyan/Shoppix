import { ENV } from "@/constants/env";
import { db } from "@/lib/appwrite";
import { addCartItem, changeStockOfCartItem } from "@/store/slices/cartItemsSlice";
import { setCartItemIds } from "@/store/slices/userSlice";
import { handleAddToCartInterface, optionType } from "@/types/Product/ProductItemProps";
import { ID } from "react-native-appwrite";

export const handleAddToCart = async ({productInfo, choosenOptions, setErrorMessage, orderedProductInfo, userData, productId, cartItems, dispatch} : handleAddToCartInterface) => {
    const allOptionsSelected = productInfo?.options?.every(
      (item: optionType) => choosenOptions[item.optionName]
    );

    if (!allOptionsSelected) {
      setErrorMessage("Ընտրեք բոլոր հատկանիշները");
      return;
    }

    if(userData && productInfo){
      try{
        const options = JSON.stringify(orderedProductInfo.options);
        const existingItem = cartItems.find((item) =>
            item.productId === productId &&
            JSON.stringify(item.options) === options
        );
        console.log(existingItem);
        console.log(cartItems);
        
        if(existingItem){
            const updatedStock  = (Number(existingItem.stock) + Number(orderedProductInfo.stock)).toString();
            await db.updateDocument(
                ENV.DB_ID,
                ENV.DB_CART_ITEMS_COL_ID,
                existingItem.cartItemId,
                {
                    stock: updatedStock,
                }
            )

            dispatch(changeStockOfCartItem({cartItemId: existingItem.cartItemId, newStock: updatedStock}))
        }else{            
            const id = ID.unique();

            const cartItem = {
                productId,
                cartItemId: id,
                image: productInfo.images[0],
                stock: orderedProductInfo.stock,
                ordering: false,
                options: options,
                price: productInfo.price,
                name: productInfo.name,
                userID: userData.ID,
            };
            
            await db.createDocument(
                ENV.DB_ID,
                ENV.DB_CART_ITEMS_COL_ID,
                id,
                cartItem
            );
 
            await db.updateDocument(
                ENV.DB_ID,
                ENV.DB_USERS_COL_ID,
                userData.ID,
                {
                    cartItems: [...userData.cartItems, id],
                }
            );
            dispatch(addCartItem({
                ...cartItem,
                options: JSON.parse(options)
            }));
            dispatch(setCartItemIds([...userData.cartItems, id]));
        }
    } catch (error: any) {
        console.error("Add to cart error:", { error, userData, productId });
        setErrorMessage("Չհաջողվեց ավելացնել զամբյուղ։");
    }
    }
};
