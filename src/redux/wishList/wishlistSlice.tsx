
import { Product } from "@/types/product.types";
import { createSlice } from "@reduxjs/toolkit";


type wishliststate = {
   items : Product
}

const initialState = {
    items : []
}

const wishlistSlice = createSlice({
    name : "wishlist",
    initialState , 
    reducers :{

        addToWishlist : (state , action) =>{
            const exists = state.items.find((item)=> item._id === action.payload._id)
            if(!exists){
                state.items.push(action.payload)
    
            }

        } 

    }
})