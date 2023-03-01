import React from 'react'
import { BooksList, AudiobooksList } from './pages'
import { CommonRoute } from 'routes/CommonRoute'

export const routes = {
  booksList: '/books',
  audiobooks: '/books/:id',
}

export const booksRoutes = [
  {
    element: <CommonRoute />,
    children: [
      {
        path: routes.booksList,
        element: <BooksList />,
      },
      {
        path: routes.audiobooks,
        element: <AudiobooksList />,
      },
    ],
  },
]
