import { createSlice } from "@reduxjs/toolkit";
//import { recetas } from "../components/recetas";

export const blogDetailSlice = createSlice({
    name: 'blogDetailSlice',
    initialState:{

        detail:{},

    },
    
    reducers:{
        getblogDetailSlice: (state, action)=>{
            state.detail = action.payload
        }

        
    }
})

export const {
    getblogDetailSlice, 
} = blogDetailSlice.actions

export default blogDetailSlice.reducer