import { account, db } from "@/lib/appwrite";
import { userDataSliceType, userDataType } from "@/types/slices/userSlice";
import { STORE_PATHS } from "@/utils/storePaths";
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
            const session = await account.get();
            const userId = session.$id;

            const userDoc = await db.getDocument(
                process.env.EXPO_PUBLIC_DB_ID!,
                STORE_PATHS.USERS,
                userId
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
    },
    extraReducers:(promise) => {
        promise
        .addCase(fetchUserProfileInfo.pending, (state, action) =>{
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
export const { setIsAuth } = userProfileSlice.actions;