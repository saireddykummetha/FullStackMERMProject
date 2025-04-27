import { createSlice } from "@reduxjs/toolkit";

const initialState={
    firstName:"",
    lastName:"",
    email:"",
    image:"",
    _id:""
 }
 export const userSlice=createSlice({
    name:"user",
    initialState,
    reducers:{
        loginRedux:(state,action)=>{
            console.log(action.payload.data)
            //  state.user=action.payload.data;
            state.firstName=action.payload.data.firstName
            state.lastName=action.payload.data.lastName
             state.email=action.payload.data.email
            state.image=action.payload.data.image
            state._id=action.payload.data._id
        },
        logoutRedux:(state,action)=>{
            state.firstName=""
            state.lastName=""
             state.email=""
            state.image=""
             state._id=""
        },
    },
})
export const {loginRedux,logoutRedux}=userSlice.actions;
export default userSlice.reducer 