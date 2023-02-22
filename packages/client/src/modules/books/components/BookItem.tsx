import { Box } from '@mui/material'
import { Book } from '../models'
import { FC } from 'react'
import { createImageUrl } from 'utils/createImageUrl'

type BookItemProps = Book

export const BookItem: FC<BookItemProps> = ({ name, imageUrl, author }) => {
  return (
    <Box
      sx={{
        height: 300,
        width: 280,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        margin: '10px',
      }}
    >
      <img
        width={238}
        height={238}
        src={createImageUrl(imageUrl)}
        alt="Обложка книги"
      />
      <span>{name}</span>
      <span>
        {author.surname} {author.name[0].toUpperCase()}.{' '}
        {author.patronymic[0].toUpperCase()}.
      </span>
    </Box>
  )
}
