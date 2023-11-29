import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { faker } from "@faker-js/faker";
import { jsonServerUrl } from '../../hook/use-thunk'

// DEV ONLY!!!
const pause = (duration) => {
  return new Promise((resolve) => {
    setTimeout(resolve, duration) // 寫法注意！
  })
}

const albumsApi = createApi({
  reducerPath: 'album',
  baseQuery: fetchBaseQuery({
    baseUrl: jsonServerUrl,
    // REMOVE FOR PRODUTION
    fetchFn: async (...args) => {
      await pause(1000);
      return fetch(...args)
    }
  }),
  endpoints(builder) {
    return {
      addAlbum: builder.mutation({
        // invalidatesTags: ['Album'], // the same as mutation
        invalidatesTags: (result, error, user) => {
          return [{ type: 'Album', id: user.id }]
        },
        query: (user) => {
          return {
            url: '/albums',
            method: 'POST',
            body: { userId: user.id, title: faker.commerce.productName() }
          }
        }
      }),
      fetchAlbums: builder.query({
        // providesTags: ['Album'], // convention: capital letter & no s
        providesTags: (result, error, user) => {
          return [{ type: 'Album', id: user.id }]
        },
        query: (user) => {
          return {
            url: '/albums',
            params: {
              userId: user.id,
            },
            method: 'GET',
          }
        }
      })
    }
  }
})

export const { useFetchAlbumsQuery, useAddAlbumMutation } = albumsApi;
export { albumsApi }