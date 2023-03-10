import { BaseQueryFn, createApi } from '@reduxjs/toolkit/query/react'
import { request } from 'utils/request'
import { AxiosRequestConfig, AxiosError } from 'axios'
import { Author } from 'modules/books'

export const audiobookApi = createApi({
  reducerPath: 'audiobookApi',
  baseQuery: request as BaseQueryFn<AxiosRequestConfig, unknown, AxiosError>,
  tagTypes: ['Audiobook'],
  endpoints: (builder) => ({
    createAudiobook: builder.mutation<Author, FormData>({
      query(data) {
        return {
          url: `/audiobooks`,
          method: 'POST',
          data,
        }
      },
      invalidatesTags: ['Audiobook'],
    }),
  }),
})

export const { useCreateAudiobookMutation } = audiobookApi
