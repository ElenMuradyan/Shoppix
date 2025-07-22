import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { db } from "@/lib/appwrite";
import { productInitialValue } from "@/types/slices/productSlice";
import { ProductItemProps } from "@/types/Product/ProductItemProps";
import { ENV } from "@/constants/env";

const initialState: productInitialValue = {
    loading: true,
    productInfo: null,
};

export const fetchProductInfo = createAsyncThunk(
    "products/fetchProductInfo",
    async(id :string, { rejectWithValue }) => {
        try{
            const doc = await db.getDocument(
                ENV.DB_ID,
                ENV.DB_PRODUCTS_COL_ID,
                id
            );

            return{
                id: doc.id,
                name: doc.name,
                price: doc.price,
                description: doc.description,
                images: doc.images,
                category: doc.category,
                subCategory: doc.subCategory,
                options: JSON.parse(doc.options || "[]"),
            } as ProductItemProps;
        }catch(error: any){
            return rejectWithValue(error.message);
        }
    }
);

const productSlice = createSlice({
    name: 'productData',
    initialState,
    reducers: {
        changeLoading: (state, action) => {
            state.loading = action.payload;
        },
    },
    extraReducers:(builder) => {
        builder
        .addCase(fetchProductInfo.pending, (state) => {
            state.loading = true;
            state.productInfo = null;
        })
        .addCase(fetchProductInfo.fulfilled, (state, action) => {
            state.loading = false;
            state.productInfo = action.payload;
        })
        .addCase(fetchProductInfo.rejected, (state) => {
            state.loading = false;
            state.productInfo = null;
        })
    }
});

export const { changeLoading } = productSlice.actions;
export default productSlice.reducer;