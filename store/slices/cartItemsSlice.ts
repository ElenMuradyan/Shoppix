import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { db } from "@/lib/appwrite";
import { cartItemsSliceType , cartProduct } from "@/types/slices/cartItemsSlice";
import ProductItem from "@/components/ProductItems/ProductItem";
import { ProductItemProps } from "@/types/Product/ProductItemProps";
import { ENV } from "@/constants/env";

const initialState: cartItemsSliceType = {
    loading: true,
    cartItems: [],
};

export const fetchCartItems = createAsyncThunk<cartProduct[], {ids: string[], products: ProductItemProps[]}>(
    "products/fetchCartItems",
    async({ids, products}, { rejectWithValue }) => {
        try{console.log('cart');
        
        const cartItems = await Promise.all(ids.map(async (id) => {
            const cartProductData = await db.getDocument(
                ENV.DB_ID,
                ENV.DB_CART_ITEMS_COL_ID,
                id
            );

            const productId = cartProductData.productId;

            const productData = products.find((item) => item.id === productId);

            return ({
                productId,
                cartItemId: id,
                name: productData?.name,
                price: productData?.price,
                image: cartProductData.image,
                stock: cartProductData.stock,
                maxStock: productData?.stock,
                ordering: cartProductData.ordering,
                options: JSON.parse(cartProductData?.options || '[]')
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

export const { changeLoading, setCartItems, setOrdering } = cartItemsSlice.actions;
export default cartItemsSlice.reducer;