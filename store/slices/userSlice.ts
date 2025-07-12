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
console.log(uid);

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
    },
    extraReducers:(promise) => {
        promise
        .addCase(fetchUserProfileInfo.pending, (state) =>{
            state.loading = true;

            console.log('pend');
            
        })
        .addCase(fetchUserProfileInfo.fulfilled, (state, action) =>{
            state.loading = false;
            state.authUserInfo.userData = action.payload;
            state.authUserInfo.isAuth = true;

                        console.log('ful');

        })
        .addCase(fetchUserProfileInfo.rejected, (state, action) =>{
            state.loading = false;
            state.authUserInfo.isAuth = false;
            state.error = action.payload as string;
            state.authUserInfo.userData = null;

            console.log('rej');
            console.log(action.payload);
            

        })
    }
})

export default userProfileSlice.reducer;
export const { setIsAuth } = userProfileSlice.actions;