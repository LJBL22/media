import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { jsonServerUrl } from "../../hook/use-thunk";

const removeUser = createAsyncThunk('users/remove', async (user) => {
  await axios.delete(`${jsonServerUrl}/${user.id}`)
  return user
})

export { removeUser }