import { Grid } from '@mui/material'
import { useGetBooksQuery } from '../api'
import { BookItem } from 'modules/books/components/BookItem'
import { Loader } from 'components/Loader'

export const BooksList = () => {
  const { data, isFetching } = useGetBooksQuery()

  if (isFetching) {
    return <Loader />
  }
  if (!data) {
    return <div>Нету данных</div>
  }
  return (
    <Grid
      container
      spacing={{ xs: 2, md: 3 }}
      columns={{ xs: 4, sm: 8, md: 12 }}
    >
      {data.map((book) => (
        <Grid item key={book.id}>
          <BookItem {...book} />
        </Grid>
      ))}
    </Grid>
  )
}
