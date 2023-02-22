import React from 'react'
import { useRoutes } from 'react-router-dom'

import { CommonRoute } from 'routes/CommonRoute'
import { authRoutes } from 'modules/auth'
import { booksRoutes } from 'modules/books'

export const App = () => {
  const element = useRoutes([...authRoutes, ...booksRoutes])
  return element
}
