import React from 'react'
import { useRoutes } from 'react-router-dom'

import { CommonRoute } from 'routes/CommonRoute'
import { authRoutes } from 'modules/auth'

export const App = () => {
  const element = useRoutes([
    {
      element: <CommonRoute />,
      children: [],
    },
    ...authRoutes,
  ])
  return element
}
