import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { productsSliceType } from "@/types/slices/productSlice";
import { db } from "@/lib/appwrite";
import { Query } from "react-native-appwrite";
import { product } from "@/types/Product/ProductItemProps";
import { ENV } from "@/constants/env";
import { searchHelper } from "@/utils/generateSearchHelper";

const initialState: productsSliceType = {
    loading: true,
    products: [],
    productNames: [...searchHelper]
};

export const fetchProducts = createAsyncThunk<{products: product[], names: string[]}>(
    "products/fetchProducts",
    async( _, { rejectWithValue }) => {
        try{
            const names:string[] = [];
            const response = await db.listDocuments(
                ENV.DB_ID,
                ENV.DB_PRODUCTS_COL_ID,
                [Query.limit(100)]
            )

            const products = response.documents.map((doc) =>{ 
                names.push(doc.name);
                return({
                id: doc.id,
                name: doc.name,
                price: doc.price,
                description: doc.description,
                images: doc.images,
                category: doc.category,
                returnable: doc.returnable,
                subCategory: doc.subCategory,
                options: JSON.parse(doc.options || "[]"),
            })}) as product[];

            return {products, names};
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
            const {products, names} = action.payload;
            state.loading = false;            
            state.products = products;
            state.productNames = [...state.productNames, ...names];
        })
        .addCase(fetchProducts.rejected, (state, action) => {
            state.loading = false;            
            state.products = [];            
        })
    }
});

export const { changeLoading } = productsSlice.actions;
export default productsSlice.reducer;