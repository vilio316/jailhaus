import { configureStore } from "@reduxjs/toolkit";
import idReducer from './idState'

export const redStore = configureStore({
    reducer:{
    id: idReducer,
    }
})

export type RootState = ReturnType<typeof redStore.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof redStore.dispatch