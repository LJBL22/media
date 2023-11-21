import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { faker } from "@faker-js/faker";

const baseUrl = 'http://localhost:3000/users'

const addUser = createAsyncThunk('user/add', async () => {
  const res = await axios.post(baseUrl, { name: faker.person.fullName() })
  // https://fakerjs.dev/api/person.html

  return res.data
})

export { addUser }