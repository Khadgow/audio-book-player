import { BaseQueryFn, createApi } from '@reduxjs/toolkit/query/react'
import { Book } from '../models'
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
    }),
  }),
})

export const { useGetBooksQuery } = booksApi
