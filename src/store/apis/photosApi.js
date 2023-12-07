import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react' // U407 reminder: add /react to get the auto-gen hook
import { faker } from "@faker-js/faker";
import { jsonServerUrl } from '../../hook/use-thunk';

const photosApi = createApi({
  reducerPath: 'photos',
  baseQuery: fetchBaseQuery({
    baseUrl: jsonServerUrl,
  }),
  endpoints(builder) {
    return {
      addPhoto: builder.mutation({
        invalidatesTags: (result, error, album) => {
          return [{ type: 'PhotoList', id: album.id }]
        },
        query: (album) => {
          return {
            url: '/photos',
            method: 'POST',
            body: {
              albumId: album.id, url: faker.image.urlPicsumPhotos({ width: 150, height: 150 })
            }
          }
        }
      }),
      removePhoto: builder.mutation({
        invalidatesTags: (result, error, photo) => {
          return [{ type: 'PhotoList', id: photo.id }]
        },
        query: (photo) => {
          return {
            url: `/photos/${photo.id}`,
            method: 'DELETE',
          }
        }
      }),
      fetchPhotos: builder.query({
        providesTags: (result, error, album) => {
          const tags = result.map(photo => {
            return { type: 'Photo', id: photo.id }
          })
          tags.push({ type: 'PhotoList', id: album.id })
          return tags
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

export const { useFetchPhotosQuery, useAddPhotoMutation, useRemovePhotoMutation } = photosApi;
export { photosApi }