import React from 'react'
import { Navigate, useRoutes } from 'react-router-dom'

import { authRoutes } from 'modules/auth'
import { booksRoutes } from 'modules/books'
import { historyRoutes } from 'modules/history'

export const App = () => {
  const element = useRoutes([
    ...authRoutes,
    ...booksRoutes,
    ...historyRoutes,
    {
      element: <Navigate to={'/books'} />,
      path: '/',
    },
  ])
  return element
}
