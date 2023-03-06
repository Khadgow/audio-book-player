import { BaseQueryFn, createApi } from '@reduxjs/toolkit/query/react'
import { History } from '../models'
import { request } from 'utils/request'
import { AxiosRequestConfig, AxiosError } from 'axios'

export const historyApi = createApi({
  reducerPath: 'historyApi',
  baseQuery: request as BaseQueryFn<AxiosRequestConfig, unknown, AxiosError>,
  tagTypes: ['history'],
  endpoints: (builder) => ({
    getHistory: builder.query<History[], void>({
      query() {
        return {
          url: '/history',
          method: 'GET',
        }
      },
    }),
    removeHistory: builder.mutation<void, { historyId: string }>({
      query({ historyId }) {
        return {
          url: `/history/${historyId}`,
          method: 'DELETE',
        }
      },
    }),
    getLastHistory: builder.query<History, void>({
      query() {
        return {
          url: '/history/last',
          method: 'GET',
        }
      },
    }),
  }),
})

export const {
  useGetHistoryQuery,
  useRemoveHistoryMutation,
  useGetLastHistoryQuery,
} = historyApi
