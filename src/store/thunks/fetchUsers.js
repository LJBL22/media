import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


const baseUrl = 'http://localhost:3000/users'
//base type //users/fetch/pending 不會經常出現，是 automatically generated 
const fetchUsers = createAsyncThunk('users/fetch', async () => {
  const res = await axios.get(baseUrl)
  console.log(res.data);
  return res.data // what return here will become payload
})

export { fetchUsers }