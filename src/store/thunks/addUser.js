import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { faker } from "@faker-js/faker";
import { jsonServerUrl } from "../../hook/use-thunk";

const addUser = createAsyncThunk('users/add', async () => {
  const res = await axios.post(jsonServerUrl, { name: faker.person.fullName() })
  // https://fakerjs.dev/api/person.html

  return res.data
})

export { addUser }