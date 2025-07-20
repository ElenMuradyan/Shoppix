import { ENV } from "@/constants/env";
import { db } from "@/lib/appwrite";
import { setCartItems, setOrdering } from "@/store/slices/cartItemsSlice";
import { setCartItemIds } from "@/store/slices/userSlice";
import { handleDeleteCartItemInterface } from "@/types/handleDeleteCartItemInterface";
import { handleStockChangeInterface } from "@/types/handleStockChangeInterface";

export const handleDeleteCartItem = async ({
  cartItemId,
  userData,
  dispatch,
  index,
  cart
}: handleDeleteCartItemInterface) => {
  if (!userData) return;

  try {
    const updatedCartItemsIndexes = userData.cartItems.filter(
      (item) => item !== cartItemId
    );

    const updatedCart = cart?.filter((item) => item.cartItemId !== cartItemId);

    dispatch(setCartItemIds(updatedCartItemsIndexes));
    dispatch(setCartItems(updatedCart));

    await db.deleteDocument(
      ENV.DB_ID,
      ENV.DB_CART_ITEMS_COL_ID,
      cartItemId
    );

    await db.updateDocument(
      ENV.DB_ID,
      ENV.DB_USERS_COL_ID,
      userData.ID,
      {
        cartItems: updatedCartItemsIndexes,
      }
    );
  } catch (error: any) {
    console.error("Error removing from cart:", error.message);
  }
};

export const handleAddToOrder = async ({cartItemId, userData, dispatch, index, ordering}: handleDeleteCartItemInterface) => {
    if(userData){
        try{
            dispatch(setOrdering({
                index,
                ordering: !ordering
            }));

            await db.updateDocument(
                ENV.DB_ID,
                ENV.DB_CART_ITEMS_COL_ID,
                cartItemId,
                {
                ordering: !ordering,
                }
            );
        }catch(error: any){
            console.error("Error changing the order status:", error.message);
        }
    }
};

export const handleStockChange = async ({cartItemId, userData, setLoading, inputValue, setSubmitChange}: handleStockChangeInterface) => {
    if(userData){
        try{
            setLoading(true);

            await db.updateDocument(
                ENV.DB_ID,
                ENV.DB_CART_ITEMS_COL_ID,
                cartItemId,
                {
                    stock: inputValue
                }
            ); 
            setSubmitChange(false);
        }catch(error: any){
            console.log(error.message);
        }finally{
            setLoading(false);
        }    
    }
}