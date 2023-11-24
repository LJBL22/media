import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { jsonServerUrl } from "../../hook/use-thunk";

const removeUser = createAsyncThunk('users/remove', async (user) => {
  // 選擇到該 id, remove
  const res = await axios.delete(`${jsonServerUrl}/${user.id}`)
  // FIX !!! LATER
  return res.data
})

export { removeUser }