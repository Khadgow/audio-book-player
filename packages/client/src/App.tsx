import React from 'react'
import { Navigate, useRoutes } from 'react-router-dom'

import { authRoutes } from 'modules/auth'
import { booksRoutes } from 'modules/books'
import { authorsRoutes } from 'modules/authors'
import { voiceActorRoutes } from 'modules/voiceActor/routes'
import { historyRoutes } from 'modules/history'
import { audiobookRoutes } from 'modules/audiobook/routes'

export const App = () => {
  const element = useRoutes([
    ...authRoutes,
    ...booksRoutes,
    ...authorsRoutes,
    ...voiceActorRoutes,
    ...historyRoutes,
    ...audiobookRoutes,
    {
      element: <Navigate to={'/books'} />,
      path: '/',
    },
  ])
  return element
}
