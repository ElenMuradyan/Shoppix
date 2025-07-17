import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
import productsReducer from './slices/productsSlice';
import productReducer from './slices/productSlice';
import cartReducer from './slices/cartItemsSlice';

export const store = configureStore({
  reducer: {
    userData: userReducer,
    products: productsReducer,
    productInfo: productReducer,
    cartItems: cartReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;