import { BaseQueryFn, createApi } from '@reduxjs/toolkit/query/react'
import { request } from 'utils/request'
import { AxiosRequestConfig, AxiosError } from 'axios'
import { Author } from 'modules/books'

export const authorsApi = createApi({
  reducerPath: 'authorsApi',
  baseQuery: request as BaseQueryFn<AxiosRequestConfig, unknown, AxiosError>,
  tagTypes: ['Author'],
  endpoints: (builder) => ({
    getAuthors: builder.query<Author[], void>({
      query() {
        return {
          url: '/authors',
          method: 'GET',
        }
      },
      providesTags: ['Author'],
    }),

    getAuthorById: builder.query<Author, { id: string }>({
      query({ id }) {
        return {
          url: `/authors/${id}`,
          method: 'GET',
        }
      },
      providesTags: ['Author'],
    }),
    postAuthor: builder.mutation<Author, Omit<Author, 'id'>>({
      query(data) {
        return {
          url: `/authors`,
          method: 'post',
          data,
        }
      },
      invalidatesTags: ['Author'],
    }),
    editAuthor: builder.mutation<Author, Author>({
      query(data) {
        return {
          url: `/authors/${data.id}`,
          method: 'put',
          data,
        }
      },
      invalidatesTags: ['Author'],
    }),
    deleteAuthor: builder.mutation<Author, string>({
      query(id) {
        return {
          url: `/authors/${id}`,
          method: 'delete',
        }
      },
      invalidatesTags: ['Author'],
    }),
  }),
})

export const {
  useGetAuthorsQuery,
  useGetAuthorByIdQuery,
  usePostAuthorMutation,
  useEditAuthorMutation,
  useDeleteAuthorMutation,
} = authorsApi
