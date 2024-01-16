import { createSlice } from "@reduxjs/toolkit";
//import { recetas } from "../components/recetas";

export const blogAll = createSlice({
    name: 'blogAll',
    initialState:{

        blogAll:[],

    },
    
    reducers:{
        getblogAll: (state, action)=>{
            state.blogAll = action.payload
        }

        
    }
})

export const {
    getblogAll, 
} = blogAll.actions

export default blogAll.reducer