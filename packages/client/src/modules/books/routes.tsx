import React from 'react'
import { BooksList } from './pages'
import { CommonRoute } from 'routes/CommonRoute'

export const routes = {
  booksList: '/books',
}

export const booksRoutes = [
  {
    element: <CommonRoute />,
    children: [
      {
        path: routes.booksList,
        element: <BooksList />,
      },
    ],
  },
]
