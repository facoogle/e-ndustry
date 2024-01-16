import { createSlice } from "@reduxjs/toolkit";
//import { recetas } from "../components/recetas";

export const allUsers = createSlice({
    name: 'allUsers',
    initialState:{

        allUsers:[],

    },
    
    reducers:{
        getAllUsers: (state, action)=>{
            state.allUsers = action.payload
        }

        
    }
})

export const {
    getAllUsers, 
} = allUsers.actions

export default allUsers.reducer