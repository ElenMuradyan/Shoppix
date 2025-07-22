import { cartProduct } from "./slices/cartItemsSlice";
import { userDataType } from "./slices/userSlice";

export interface handleOrderInterface {
    cart: cartProduct[],
    setErrorMessage: (message: string) => void; 
    userData?: userDataType;
}