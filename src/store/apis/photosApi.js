import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { jsonServerUrl } from '../../hook/use-thunk';

const photosApi = createApi({
  reducerPath: 'photos',
  baseQuery: fetchBaseQuery({
    baseUrl: jsonServerUrl,
  }),
  endpoints(builder) {
    return {
      fetchPhotos: builder.query({
        providesTags: (result, error, album) => {
          return [{ type: 'SongPhotos', id: album.id }]
        },
        query: (album) => {
          return {
            url: '/photos',
            params: {
              albumId: album.id,
            },
            method: 'GET',
          }
        }
      })
    }
  }
})

export const { useFetchPhotosQuery } = photosApi;
export { photosApi }