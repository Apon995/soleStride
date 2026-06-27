import { configureStore } from "@reduxjs/toolkit";
import authToggleReducer from "@/redux/auth/AuthToggleSlice";
import wishlistReducer from '@/redux/wishList/wishlistSlice'



export const store = configureStore({
    reducer: {
         authToggle : authToggleReducer,
         wishlist : wishlistReducer
    }
})


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch