import React from 'react'
import { useRoutes } from 'react-router-dom'

import { CommonRoute } from 'routes/CommonRoute'
import { authRoutes } from 'modules/auth'
import { booksRoutes } from 'modules/books'
import { authorsRoutes } from './modules/authors'
import { voiceActorRoutes } from './modules/voiceActor/routes'

export const App = () => {
  const element = useRoutes([
    ...authRoutes,
    ...booksRoutes,
    ...authorsRoutes,
    ...voiceActorRoutes,
  ])
  return element
}
