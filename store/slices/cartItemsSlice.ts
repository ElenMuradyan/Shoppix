import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { db } from "@/lib/appwrite";
import { cartItemsSliceType , cartProduct } from "@/types/slices/cartItemsSlice";
import { ENV } from "@/constants/env";

const initialState: cartItemsSliceType = {
    loading: true,
    cartItems: [],
};

export const fetchCartItems = createAsyncThunk<cartProduct[], {ids: string[]}>(
    "products/fetchCartItems",
    async({ids}, { rejectWithValue }) => {
        try{
        const cartItems = await Promise.all(ids.map(async (id) => {
            const cartProductData = await db.getDocument(
                ENV.DB_ID,
                ENV.DB_CART_ITEMS_COL_ID,
                id
            );

            return ({
                productId: cartProductData.productId,
                cartItemId: id,
                name: cartProductData.name,
                price: cartProductData.price,
                image: cartProductData.image,
                stock: cartProductData.stock,
                ordering: cartProductData.ordering,
                returnable: cartProductData.returnable,
                options: JSON.parse(cartProductData?.options || '[]'),
                userID: cartProductData.userID
            } as cartProduct); 
            }))

            return cartItems;
        }catch(error: any){
            return rejectWithValue(error.message);
        }
    }
);

const cartItemsSlice = createSlice({
    name: 'cartItems',
    initialState,
    reducers: {
        changeLoading: (state, action) => {
            state.loading = action.payload;
        },
        setOrdering: (state, action) => {            
            state.cartItems[action.payload.index].ordering = action.payload.ordering;
        },
        setCartItems: (state, action) => { 
            state.cartItems = [...action.payload];
        },
        changeStockOfCartItem: (state, action) => {
            const { cartItemId, newStock } = action.payload;

            const index = state.cartItems.findIndex((item) => item.cartItemId === cartItemId);
            if(index !== -1){
                state.cartItems[index].stock = newStock;
            }
        },
        addCartItem: (state, action) => {
            state.cartItems.push(action.payload);
        },
        deleteCartItem: (state, action) => {
            const arr = [...state.cartItems];
            const index = arr.findIndex((item) => item.cartItemId === action.payload);

            arr.splice(index, 1);
            state.cartItems = arr;
        }
    },
    extraReducers:(builder) => {
        builder
        .addCase(fetchCartItems.pending, (state) => {
            state.loading = true;
            state.cartItems = [];
        })
        .addCase(fetchCartItems.fulfilled, (state, action) => {
            state.loading = false;
            state.cartItems = [...action.payload];
        })
        .addCase(fetchCartItems.rejected, (state, action) => {
            state.loading = false;
            state.cartItems = [];
        })
    }
});

export const { changeLoading, setCartItems, setOrdering, changeStockOfCartItem, addCartItem } = cartItemsSlice.actions;
export default cartItemsSlice.reducer;