import { AppDispatch } from "@/store/store";
import { userDataType } from "./slices/userSlice";

export interface handleStockChangeInterface {
    cartItemId: string, 
    userData: userDataType | null, 
    setLoading: (loading: boolean) => void, 
    inputValue: string, 
    setSubmitChange: (loading: boolean) => void, 
    dispatch: AppDispatch;
    index?: number,
}