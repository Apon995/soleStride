import { configureStore } from "@reduxjs/toolkit";
import authToggleReducer from "@/redux/auth/AuthToggleSlice";



export const store = configureStore({
    reducer: {
         authToggle : authToggleReducer,
    }
})


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch