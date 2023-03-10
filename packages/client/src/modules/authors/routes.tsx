import React from 'react'

import { CommonRoute } from 'routes/CommonRoute'
import { AuthorsList, AuthorPage } from './pages'
import { AuthorCreationForm } from './components/AuthorCreationForm'
import { AuthorEditingForm } from './components/AuthorEditingForm'
import { RoleRoute } from 'routes/RoleRoute'

export const routes = {
  authorsList: '/authors',
  author: '/authors/:id',
  authorCreate: '/authors/create',
  authorEdit: '/authors/edit/:id',
}

export const authorsRoutes = [
  {
    element: <RoleRoute roles={['ADMIN']} />,
    children: [
      {
        path: routes.authorsList,
        element: <AuthorsList />,
      },
      {
        path: routes.author,
        element: <AuthorPage />,
      },
      {
        path: routes.authorCreate,
        element: <AuthorCreationForm />,
      },
      {
        path: routes.authorEdit,
        element: <AuthorEditingForm />,
      },
    ],
  },
]
