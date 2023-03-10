import { Box } from '@mui/material'
import { Book } from 'modules/books/models'
import { FC } from 'react'
import { createImageUrl } from 'utils/createImageUrl'
import { generatePath, Link } from 'react-router-dom'
import { routes } from 'modules/books/index'
import { createShortName } from 'utils/createShortName'
import { css } from '@emotion/css'
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
          className={css`
            cursor: pointer;
            transition: 0.5s;
            &:hover {
              filter: brightness(40%);
            }
          `}
        />
      </Link>

      <Link
        to={generatePath(routes.audiobooks, { id })}
        className={css`
          cursor: pointer;
          transition: 0.5s;
          color: black;
          text-decoration: none;
          &:hover {
            text-decoration: underline;
          }
        `}
      >
        <span>{name}</span>
      </Link>
      <span
        className={css`
          color: #a3a3a3;
        `}
      >
        {createShortName(author)}
      </span>
    </Box>
  )
}
