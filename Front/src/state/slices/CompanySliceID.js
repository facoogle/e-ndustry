import { createSlice } from "@reduxjs/toolkit";
//import { recetas } from "../components/recetas";

export const companySliceID = createSlice({
    name: 'companySliceID',
    initialState:{

        companySliceID:[],

    },
    
    reducers:{
        getCompanyID: (state, action)=>{
            state.companySliceID = action.payload
        }

        
    }
})

export const {
    getCompanyID, 
} = companySliceID.actions

export default companySliceID.reducer