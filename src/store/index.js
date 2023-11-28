import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { usersReducer } from "./slices/usersSlice";
import { albumsApi } from "./apis/albumsApi";

export const store = configureStore({
  reducer: {
    users: usersReducer,
    // albums: albumsApi.reducer 同下
    [albumsApi.reducerPath]: albumsApi.reducer //易於避免失誤
  },
  middleware: (getDefaultMiddleware) => { // step 7
    return getDefaultMiddleware()
      .concat(albumsApi.middleware);
  }
})

setupListeners(store.dispatch) // step 7

export * from './thunks/fetchUsers'
export * from './thunks/addUser'
export * from './thunks/removeUser'

export { useFetchAlbumsQuery } from './apis/albumsApi' // step 8