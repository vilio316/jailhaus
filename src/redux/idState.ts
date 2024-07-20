import { createSlice } from "@reduxjs/toolkit";

const idSlice = createSlice({
    name: 'id',
    initialState: {id:''},
    reducers:{
        setID(state, action) {
            state.id = action.payload;
        },
    },
})

export const { setID } = idSlice.actions
export default idSlice.reducer
