import { createSlice } from "@reduxjs/toolkit";

const idSlice = createSlice({
    name: 'id',
    initialState: {
        idVal:'', 
    
    },
    reducers:{
        setID : (state, action) =>{
            return {...state, idVal: action.payload}
        },
    },
})

type Stamina = {
    id: {
        idVal: string
    },
}

export const userID = (state: Stamina) => state.id.idVal
export const { setID } = idSlice.actions
export default idSlice.reducer
