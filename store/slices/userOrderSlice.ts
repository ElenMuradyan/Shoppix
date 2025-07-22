import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { db } from "@/lib/appwrite";
import { ENV } from "@/constants/env";
import { order, userOrdersSlice } from "@/types/slices/ordersSlice";

const initialState: userOrdersSlice = {
    loading: true,
    userOrders: [],
};

export const fetchUserOrders = createAsyncThunk<order[], {ids: string[]}>(
    "products/userOrders",
    async({ids}, { rejectWithValue }) => {
        try{
        const orders = await Promise.all(ids.map(async (id) => {
            const orderData = await db.getDocument(
                ENV.DB_ID,
                ENV.DB_ORDERS_COL_ID,
                id
            );
            const cartProducts = orderData.cartProducts.map((item: string) => JSON.parse(item));

            return ({
                date: orderData.$createdAt,
                id: orderData.$id,
                address: JSON.parse(orderData.address),
                status: orderData.status,
                cartProducts: cartProducts,
                totalPrice: orderData.totalPrice,
                userName: orderData.userName,
                userPhone: orderData.userPhone,
                userEmail: orderData.userEmail,
                userId: orderData.userId
            } as order); 
            }))
            return orders;
        }catch(error: any){
            return rejectWithValue(error.message);
        }
    }
);

const userOdersSlice = createSlice({
    name: 'userOrders',
    initialState,
    reducers: {
        changeLoading: (state, action) => {
            state.loading = action.payload;
        },
        setUserOrders: (state, action) => { 
            state.userOrders = [...action.payload];
        },
        addUserOrder: (state, action) => {
            state.userOrders.push(action.payload);
        }
    },
    extraReducers:(builder) => {
        builder
        .addCase(fetchUserOrders.pending, (state) => {
            state.loading = true;
            state.userOrders = [];
        })
        .addCase(fetchUserOrders.fulfilled, (state, action) => {
            state.loading = false;
            console.log(action.payload);
            
            state.userOrders = [...action.payload];
        })
        .addCase(fetchUserOrders.rejected, (state, action) => {
            console.log('rej');
            console.log(action.payload);
            
            state.loading = false;
            state.userOrders = [];
        })
    }
});

export const { changeLoading, setUserOrders, addUserOrder } = userOdersSlice.actions;
export default userOdersSlice.reducer;