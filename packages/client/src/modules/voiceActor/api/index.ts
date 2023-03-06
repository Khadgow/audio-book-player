import { BaseQueryFn, createApi } from '@reduxjs/toolkit/query/react'
import { request } from 'utils/request'
import { AxiosRequestConfig, AxiosError } from 'axios'
import { Author } from 'modules/books'

export const voiceActorApi = createApi({
  reducerPath: 'voiceActorApi',
  baseQuery: request as BaseQueryFn<AxiosRequestConfig, unknown, AxiosError>,
  tagTypes: ['VoiceAuthor'],
  endpoints: (builder) => ({
    getVoiceActor: builder.query<Author[], void>({
      query() {
        return {
          url: '/voice-actors',
          method: 'GET',
        }
      },
      providesTags: ['VoiceAuthor'],
    }),

    getVoiceActorById: builder.query<Author, { id: string }>({
      query({ id }) {
        return {
          url: `/voice-actors/${id}`,
          method: 'GET',
        }
      },
      providesTags: ['VoiceAuthor'],
    }),
    addVoiceActor: builder.mutation<Author, Omit<Author, 'id'>>({
      query(data) {
        return {
          url: `/voice-actors`,
          method: 'post',
          data,
        }
      },
      invalidatesTags: ['VoiceAuthor'],
    }),
    editVoiceActor: builder.mutation<Author, Author>({
      query(data) {
        return {
          url: `/voice-actors/${data.id}`,
          method: 'put',
          data,
        }
      },
      invalidatesTags: ['VoiceAuthor'],
    }),
    deleteVoiceActor: builder.mutation<Author, string>({
      query(id) {
        return {
          url: `/voice-actors/${id}`,
          method: 'delete',
        }
      },
      invalidatesTags: ['VoiceAuthor'],
    }),
  }),
})

export const {
  useGetVoiceActorQuery,
  useGetVoiceActorByIdQuery,
  useAddVoiceActorMutation,
  useEditVoiceActorMutation,
  useDeleteVoiceActorMutation,
} = voiceActorApi
