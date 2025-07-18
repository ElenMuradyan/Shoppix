import { db } from "@/lib/appwrite";
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
        const existingItem = cartItems.find((item) =>
            item.productId === productId &&
            JSON.stringify(item.options) === JSON.stringify(orderedProductInfo.options)
        );
        console.log(existingItem);
        
        if(existingItem){            console.log('if');
            if(Number(existingItem.stock) + Number(orderedProductInfo.stock) > Number(existingItem.maxStock)) {
                setErrorMessage("Ընտրված քանակը գերազանցում է պահեստում առկա քանակը");
                return;
            } 
            console.log((Number(existingItem.stock) + Number(orderedProductInfo.stock)).toString())
            await db.updateDocument(
                process.env.EXPO_PUBLIC_DB_ID!,
                process.env.EXPO_PUBLIC_DB_CARTITEMS_COL_ID!,
                existingItem.cartItemId,
                {
                    stock: (Number(existingItem.stock) + Number(orderedProductInfo.stock)).toString(),
                }
            );
        }else{
            console.log('else');
            
            const id = ID.unique();

            const cartItem = {
                productId,
                stock: orderedProductInfo.stock,
                options: JSON.stringify(orderedProductInfo.options),
                image: productInfo.images[0],
                cartItemId: id,
            };
            
            await db.createDocument(
                process.env.EXPO_PUBLIC_DB_ID!,
                process.env.EXPO_PUBLIC_DB_CARTITEMS_COL_ID!,
                id,
                cartItem
            );

            await db.updateDocument(
                process.env.EXPO_PUBLIC_DB_ID!,
                process.env.EXPO_PUBLIC_DB_USERS_COL_ID!,
                userData.ID,
                {
                    cartItems: [...userData.cartItems, id],
                }
            );

            dispatch(setCartItemIds([...userData.cartItems, id]));
        }
    } catch (error: any) {
        console.error("Add to cart error:", error);
        setErrorMessage("Չհաջողվեց ավելացնել զամբյուղ։");
    }
    }
};
