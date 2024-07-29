import { configureStore } from "@reduxjs/toolkit";
import idReducer from './idState'

export const redStore = configureStore({
    reducer:{
    id: idReducer,
    }
})

export type AppStore = typeof redStore
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']