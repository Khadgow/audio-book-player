import { Box } from '@mui/material'
import { Book } from '../models'
import { FC } from 'react'
import { createImageUrl } from 'utils/createImageUrl'
import { generatePath, Link } from 'react-router-dom'
import { routes } from 'modules/books'
import { createShortName } from 'utils/createShortName'

type BookItemProps = Book

export const BookItem: FC<BookItemProps> = ({ name, imageUrl, author, id }) => {
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
      <Link to={generatePath(routes.audiobooks, { id })}>
        <img
          width={238}
          height={238}
          src={createImageUrl(imageUrl)}
          alt="Обложка книги"
        />
      </Link>

      <Link to={generatePath(routes.audiobooks, { id })}>
        <span>{name}</span>
      </Link>
      <span>{createShortName(author)}</span>
    </Box>
  )
}
