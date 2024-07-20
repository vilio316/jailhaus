import { configureStore } from "@reduxjs/toolkit";
import idReducer from './idState'

export const redStore = configureStore({
    reducer:{
    id: idReducer
    }
})

