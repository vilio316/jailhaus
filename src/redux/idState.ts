import { createSlice } from "@reduxjs/toolkit";

const idSlice = createSlice({
    name: 'id',
    initialState: {
        idVal:'', 
        pwdArr: [],
    },
    reducers:{
        setID : (state, action) =>{
            return {...state, idVal: action.payload}
        },
        changePwds : (state, action) => {
            return {...state, pwdArr: action.payload}
        }
    },
})

type Stamina = {
    id: {
        idVal: string
    },
}

export const userID = (state: Stamina) => state.id.idVal
export const userPwds = (state : any)=> state.id.pwdArr
export const { setID, changePwds } = idSlice.actions
export default idSlice.reducer
