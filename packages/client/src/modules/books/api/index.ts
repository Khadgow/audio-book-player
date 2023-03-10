import { BaseQueryFn, createApi } from '@reduxjs/toolkit/query/react'
import { ChangeBook, Book, BookWithAudio } from '../models'
import { request } from 'utils/request'
import { AxiosRequestConfig, AxiosError } from 'axios'

export const booksApi = createApi({
  reducerPath: 'booksApi',
  baseQuery: request as BaseQueryFn<AxiosRequestConfig, unknown, AxiosError>,
  tagTypes: ['Book'],
  endpoints: (builder) => ({
    getBooks: builder.query<Book[], void>({
      query() {
        return {
          url: '/books',
          method: 'GET',
        }
      },
      providesTags: ['Book'],
    }),
    getBookById: builder.query<BookWithAudio, { id: string }>({
      query({ id }) {
        return {
          url: `/books/${id}`,
          method: 'GET',
        }
      },
      providesTags: ['Book'],
    }),

    addBook: builder.mutation<ChangeBook, Omit<ChangeBook, 'id'>>({
      query(data) {
        return {
          url: `/books`,
          method: 'post',
          data,
        }
      },
      invalidatesTags: ['Book'],
    }),
    editBook: builder.mutation<ChangeBook, ChangeBook>({
      query(data) {
        return {
          url: `/books/${data.id}`,
          method: 'put',
          data,
        }
      },
      invalidatesTags: ['Book'],
    }),
  }),
})

export const {
  useGetBooksQuery,
  useGetBookByIdQuery,
  useAddBookMutation,
  useEditBookMutation,
} = booksApi
