import React, { FC } from 'react'
import { Author } from 'modules/books'
import { generatePath, Link } from 'react-router-dom'

type AuthorItemProps = Author & { itemRoute: string }

export const BasicItem: FC<AuthorItemProps> = ({
  id,
  name,
  surname,
  patronymic,
  itemRoute,
}) => {
  return (
    <Link
      style={{ textDecoration: 'none', color: 'black' }}
      to={generatePath(itemRoute, { id })}
    >
      <span>{name} </span>
      <span>{patronymic} </span>
      <span>{surname} </span>
    </Link>
  )
}
