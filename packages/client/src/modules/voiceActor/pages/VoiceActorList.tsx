import React from 'react'
import { Loader } from 'components/Loader'
import { routes } from '../routes'
import { useGetVoiceActorQuery } from '../api'
import { ListContainer } from 'components/ListContainer'

export const VoiceActorList = () => {
  const { data, isFetching } = useGetVoiceActorQuery()

  if (isFetching) {
    return <Loader />
  }
  if (!data) {
    return <div>Нету данных</div>
  }

  return (
    <ListContainer
      data={data}
      creationRoute={routes.voiceActorCreate}
      itemRoute={routes.voiceActor}
    />
  )
}
