import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { jsonServerUrl } from '../../hook/use-thunk'
const albumsApi = createApi({
  // reducerPath: to store (slice 在 createApi 當下就創建了,因此標注 path 即可，循著 key 找儲存的東西)
  reducerPath: 'album',
  // baseQuery: how & where to send req
  baseQuery: fetchBaseQuery({
    baseUrl: jsonServerUrl
  }),
  // endpoints: 每一個行動都要建立，並分為 query & mutation
  endpoints(builder) {
    return {
      fetchAlbums: builder.query({
        query: (user) => {
          return {
            url: 'albums',
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

export const { useFetchAlbumsQuery } = albumsApi;
export { albumsApi }