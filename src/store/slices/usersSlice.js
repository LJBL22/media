import { createSlice } from "@reduxjs/toolkit";
import { fetchUsers } from "../thunks/fetchUsers";
import { addUser } from "../thunks/addUser";

const usersSlice = createSlice({
  name: 'users',
  initialState: {
    isLoading: false,
    data: [],
    error: null,
  },
  extraReducers(builder) {
    builder.addCase(fetchUsers.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload; // important!
    });
    builder.addCase(fetchUsers.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error; // important!
    });
    builder.addCase(addUser.pending, (state, action) => {
      state.isLoading = true;// 這裡會讓新增時全面都 shimmer ，直接刪掉也可以，但更好的做法是讓 add user 鍵開始 loading
    });
    builder.addCase(addUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data.push(action.payload); // important!
    });
    builder.addCase(addUser.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error; // important!
    });
  },
});

export const usersReducer = usersSlice.reducer