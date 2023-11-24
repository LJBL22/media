import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { jsonServerUrl } from "../../hook/use-thunk";

//base type //users/fetch/pending 不會經常出現，是 automatically generated 
const fetchUsers = createAsyncThunk('users/fetch', async () => {
  const res = await axios.get(jsonServerUrl)

  // DEV ONLY!!!
  await pause(4000)

  return res.data // what return here will become payload
})

// DEV ONLY!!! //helper function
const pause = (duration) => {
  return new Promise((resolve) => {
    setTimeout(resolve, duration) // 寫法注意！
  })
}


export { fetchUsers }