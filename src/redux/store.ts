import { configureStore } from "@reduxjs/toolkit";
import idReducer from './idState'
import { persistStore, persistReducer,  FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER} from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
    key: 'jailhaus',
    storage
}

const idPersisted = persistReducer(persistConfig, idReducer)
export const redStore = configureStore({
    reducer:{
    id: idPersisted,
    },
    middleware: (getDefaultMiddleware) =>  getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }),
})

export const persStore = persistStore(redStore)
export type RootState = ReturnType<typeof redStore.getState>
export type AppDispatch = typeof redStore.dispatch