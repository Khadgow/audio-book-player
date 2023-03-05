import React from 'react'
import { HistoryList } from './pages'
import { CommonRoute } from 'routes/CommonRoute'

export const routes = {
  historyList: '/history',
}

export const historyRoutes = [
  {
    element: <CommonRoute />,
    children: [
      {
        path: routes.historyList,
        element: <HistoryList />,
      },
    ],
  },
]
