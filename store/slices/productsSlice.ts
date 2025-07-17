import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { productsSliceType } from "@/types/slices/productSlice";
import { db } from "@/lib/appwrite";
import { Query } from "react-native-appwrite";
import { ProductItemProps } from "@/types/Product/ProductItemProps";

const initialState: productsSliceType = {
    loading: true,
    products: [],
};

export const fetchProducts = createAsyncThunk<ProductItemProps[]>(
    "products/fetchProducts",
    async( _, { rejectWithValue }) => {
        try{
            const response = await db.listDocuments(
                process.env.EXPO_PUBLIC_DB_ID!,
                process.env.EXPO_PUBLIC_DB_PRODUCTS_COL_ID!,
                [Query.limit(100)]
            )

            const products = response.documents.map((doc) => ({
                id: doc.id,
                name: doc.name,
                price: doc.price,
                description: doc.description,
                images: doc.images,
                stock: doc.stock,
                category: doc.category,
                subCategory: doc.subCategory,
                options: JSON.parse(doc.options || "[]"),
            }))                
            return products as ProductItemProps[];
        }catch(error: any){
            return rejectWithValue(error.message);
        }
    }
);

const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        changeLoading: (state, action) => {
            state.loading = action.payload;
        },
    },
    extraReducers:(builder) => {
        builder
        .addCase(fetchProducts.pending, (state) => {
            state.loading = true;
            state.products = [];
        })
        .addCase(fetchProducts.fulfilled, (state, action) => {
            state.loading = false;            
            state.products = action.payload;
        })
        .addCase(fetchProducts.rejected, (state, action) => {
            state.loading = false;            
            state.products = [];            
        })
    }
});

export const { changeLoading } = productsSlice.actions;
export default productsSlice.reducer;