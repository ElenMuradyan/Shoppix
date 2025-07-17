import { account, db } from "@/lib/appwrite";
import { userDataSliceType, userDataType } from "@/types/slices/userSlice";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState: userDataSliceType = {
    loading: true,
    authUserInfo: {
        isAuth: false,
        userData: null,
    },
    error: null
}

export const fetchUserProfileInfo = createAsyncThunk<userDataType, void, { rejectValue: string }>(
    'data/fetchUserProfileInfo', 
    async (_, { rejectWithValue }) => {
        try{         
            const user = await account.get();            
            const uid = user.$id;

            if (!uid) {
                return rejectWithValue('No valid session found. Please log in again.');
            }

            const userDoc = await db.getDocument(
                process.env.EXPO_PUBLIC_DB_ID!,
                process.env.EXPO_PUBLIC_DB_USERS_COL_ID!,
                uid
            )

            return userDoc as unknown as userDataType;
        }catch(error: any) {
            return rejectWithValue(error?.message || "Failed to fetch user profile");
        }
})

const userProfileSlice = createSlice({
    name:'userProfile',
    initialState,
    reducers: {
       setIsAuth: (state, action) => {
            state.authUserInfo.isAuth = action.payload;
       },
       setCartItems: (state, action) => {
        if(state.authUserInfo.userData)
            state.authUserInfo.userData.cartItems = [...state.authUserInfo.userData.cartItems, action.payload];
        }
    },
    extraReducers:(promise) => {
        promise
        .addCase(fetchUserProfileInfo.pending, (state) =>{
            state.loading = true;            
        })
        .addCase(fetchUserProfileInfo.fulfilled, (state, action) =>{
            state.loading = false;            
            state.authUserInfo.userData = action.payload;
            state.authUserInfo.isAuth = true;
        })
        .addCase(fetchUserProfileInfo.rejected, (state, action) =>{
            state.loading = false;
            state.authUserInfo.isAuth = false;
            state.error = action.payload as string;
            state.authUserInfo.userData = null;
        })
    }
})

export default userProfileSlice.reducer;
export const { setIsAuth, setCartItems } = userProfileSlice.actions;