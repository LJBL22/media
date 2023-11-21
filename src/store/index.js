import { configureStore } from "@reduxjs/toolkit";
import { usersReducer } from "./slices/usersSlice";

export const store = configureStore({
  reducer: {
    users: usersReducer,
  }
})

export * from './thunks/fetchUsers' // 所有在 fetchUsers 內 export 的，都透過這裡 export 出去