import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentUser:null,
    loading:null,
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
            state.loading = null,
            state.error = null
        },
        signInFailure:(state,action)=>{
            state.loading = null,
            state.error = action.payload
        },
        signOutStart:(state)=>{
            state.loading = true,
            state.error = null
        },
        signOutSuccess:(state)=>{
            state.currentUser = null
            state.loading = null,
            state.error = null
        },
        signOutFailure:(state,action)=>{
            state.loading = false,
            state.error = action.payload
        },
        updateUserStart:(state)=>{
            state.loading = true,
            state.error = null
        },
        updateUserSuccess:(state,action)=>{
            state.currentUser = action.payload
            state.loading = null,
            state.error = null
        },
        updateUserFailure:(state,action)=>{
            state.loading = null,
            state.error = action.payload
        },
        deleteUserStart:(state)=>{
            state.loading = true,
            state.error = null
        },
        deleteUserSuccess:(state)=>{
            state.currentUser = null
            state.loading = null,
            state.error = null
        },
        deleteUserFailure:(state,action)=>{
            state.loading = null,
            state.error = action.payload
        },
    }
})

export const {signInStart,signInSuccess,signInFailure,
            signOutStart,signOutSuccess,signOutFailure,
            updateUserStart,updateUserSuccess,updateUserFailure,
            deleteUserStart,deleteUserSuccess,deleteUserFailure
        } = userSlice.actions

export default userSlice.reducer