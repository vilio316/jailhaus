import { createSlice } from "@reduxjs/toolkit";

const idSlice = createSlice({
    name: 'id',
    initialState: {
        idVal:'', 
        pwdArr: [],
        seedsArr: []
    },
    reducers:{
        setID : (state, action) =>{
            return {...state, idVal: action.payload}
        },
        changePwds : (state, action) => {
            return {...state, pwdArr: action.payload}
        },
        setSeedValues : (state, action) => {
            return {...state, seedsArr: action.payload}
        }
    },
})

type Stamina = {
    id: {
        idVal: string,
        pwdArr : any[],
        seedsArr: any[],
    },

}

export const userID = (state: Stamina) => state.id.idVal
export const userPwds = (state : Stamina)=> state.id.pwdArr
export const userSeeds = (state: Stamina) => state.id.seedsArr
export const { setID, changePwds, setSeedValues } = idSlice.actions
export default idSlice.reducer
