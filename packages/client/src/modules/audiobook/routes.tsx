import React from 'react'
import { AudiobookForm } from './pages'
import { CommonRoute } from 'routes/CommonRoute'
import { RoleRoute } from 'routes/RoleRoute'

export const routes = {
  audiobookForm: '/audiobooks',
}

export const audiobookRoutes = [
  {
    element: <RoleRoute roles={['ADMIN']} />,
    children: [
      {
        path: routes.audiobookForm,
        element: <AudiobookForm />,
      },
    ],
  },
]
