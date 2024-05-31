import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentUser:null,
    loading:false,
    error:null
}

const userSlice = createSlice({
    name:'user',
    initialState,
    reducers:{
        signInStart:(state)=>{
            state.loading = true,
            state.error = null
        },
        signInSuccess:(state,action)=>{
            state.currentUser = action.payload
            state.loading = false,
            state.error = null
        },
        signInFailure:(state,action)=>{
            state.loading = false,
            state.error = action.payload
        },
        signOutStart:(state)=>{
            state.loading = true,
            state.error = null
        },
        signOutSuccess:(state)=>{
            state.currentUser = null
            state.loading = false,
            state.error = null
        },
        signOutFailure:(state,action)=>{
            state.loading = false,
            state.error = action.payload
        },
    }
})

export const {signInStart,signInSuccess,signInFailure,
            signOutStart,signOutSuccess,signOutFailure} = userSlice.actions

export default userSlice.reducer