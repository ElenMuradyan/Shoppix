import { cartProduct } from "./slices/cartItemsSlice";

export interface handleOrderInterface {
    cart: cartProduct[],
    setErrorMessage: (message: string) => void; 
}