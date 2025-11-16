import { createSlice } from "@reduxjs/toolkit";



interface toggleTypes {
    value : boolean
}

const initialState:toggleTypes = {
   value : false 
}

const authToggleSlice = createSlice({
    name : "authToggle",
    initialState,
    reducers : {
        authModalShow : (state)=>{
            state.value = true ;
        },
        authModalClose : (state)=>{
            state.value = false 
        }
    }

})


export default authToggleSlice.reducer;
export const {authModalShow , authModalClose} = authToggleSlice.actions;