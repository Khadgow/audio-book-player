import React from 'react'
import { Loader } from 'components/Loader'
import { useGetAuthorsQuery } from '../api'
import { routes } from '../routes'
import { ListContainer } from 'components/ListContainer'

export const AuthorsList = () => {
  const { data, isFetching } = useGetAuthorsQuery()

  if (isFetching) {
    return <Loader />
  }
  if (!data) {
    return <div>Нету данных</div>
  }

  return (
    <ListContainer
      data={data}
      creationRoute={routes.authorCreate}
      itemRoute={routes.author}
    />
  )
}
