import React from 'react'

import { CommonRoute } from 'routes/CommonRoute'
import { VoiceActorList } from './pages/VoiceActorList'
import { VoiceActorCreationForm } from './components/VoiceActorCreationForm'
import { VoiceActorEditingForm } from './components/VoiceActorEditingForm'
import { VoiceActorPage } from './pages/VoiceActorPage'

export const routes = {
  voiceActorList: '/voiceActor',
  voiceActor: '/voiceActor/:id',
  voiceActorCreate: '/voiceActor/create',
  voiceActorEdit: '/voiceActor/edit/:id',
}

export const voiceActorRoutes = [
  {
    element: <CommonRoute />,
    children: [
      {
        path: routes.voiceActorList,
        element: <VoiceActorList />,
      },
      {
        path: routes.voiceActorEdit,
        element: <VoiceActorEditingForm />,
      },
      {
        path: routes.voiceActorCreate,
        element: <VoiceActorCreationForm />,
      },
      {
        path: routes.voiceActor,
        element: <VoiceActorPage />,
      },
    ],
  },
]
