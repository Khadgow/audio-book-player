import { useGetBooksQuery } from '../api'
import { Loader } from 'components/Loader'
import { ListContainer } from '../../../components/ListContainer'
import { routes } from '../routes'
import React from 'react'

export const BooksList = () => {
  const { data, isFetching } = useGetBooksQuery()

  if (isFetching) {
    return <Loader />
  }
  if (!data) {
    return <div>Нету данных</div>
  }
  return (
    <ListContainer
      data={data}
      creationRoute={routes.booksCreate}
      itemRoute={routes.audiobooks}
      isBooks={true}
    />
    // <Grid
    //   container
    //   spacing={{ xs: 2, md: 3 }}
    //   columns={{ xs: 4, sm: 8, md: 12 }}
    // >
    //   {data.map((book) => (
    //     <Grid item key={book.id}>
    //       <BookItem {...book} />
    //     </Grid>
    //   ))}
    // </Grid>
  )
}
