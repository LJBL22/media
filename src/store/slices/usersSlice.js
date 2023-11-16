import { createSlice } from "@reduxjs/toolkit";

const usersSlice = createSlice({
  name: 'users',
  initialState: {
    data: []
  },
  reducers: {} //未來其實這個 users 不會用到此（沒有行動需求？）
});

export const usersReducer = usersSlice.reducer