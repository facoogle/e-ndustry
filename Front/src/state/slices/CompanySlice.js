import { createSlice } from "@reduxjs/toolkit";
//import { recetas } from "../components/recetas";

export const companySlice = createSlice({
    name: 'companySlice',
    initialState:{

        companySlice:[],

    },
    
    reducers:{
        getCompany: (state, action)=>{
            state.companySlice = action.payload
        }

        
    }
})

export const {
    getCompany, 
} = companySlice.actions

export default companySlice.reducer