import React from 'react'
import { BooksList, AudiobooksList } from './pages'
import { CommonRoute } from 'routes/CommonRoute'
import { BooksCreationForm } from './components/BooksCreationForm'
import { BookEditionForm } from './components/BookEditionForm'

export const routes = {
  booksList: '/books',
  audiobooks: '/books/:id',
  booksCreate: '/books/create',
  booksEdit: '/books/edit/:id',
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
      {
        path: routes.booksCreate,
        element: <BooksCreationForm />,
      },
      {
        path: routes.booksEdit,
        element: <BookEditionForm />,
      },
    ],
  },
]
