import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { ChangeBook } from '../models'
import { useEditBookMutation, useGetBookByIdQuery } from '../api'
import { Loader } from '../../../components/Loader'
import { BasicForm } from '../../../components/BasicForm'
import { TextInput } from '../../../components/FormInputs'
import { isEqual } from 'lodash'
import { routes } from '../routes'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import { useGetAuthorsQuery } from '../../authors'

export const BookEditionForm = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const methods = useForm<Omit<ChangeBook, 'id'>>()

  const [editBook] = useEditBookMutation()
  const { data: authors, isFetching: isFetchingAuthors } = useGetAuthorsQuery()
  const { data: getDataById, isFetching: isFetchingBook } = useGetBookByIdQuery(
    { id }
  )

  const [age, setAge] = React.useState(getDataById.author)

  const onSubmit = (data: Omit<ChangeBook, 'id'>) => {
    if (!isEqual({ ...data, id }, getDataById)) editBook({ ...data, id })
    navigate(routes.booksList)
  }

  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value as string)
  }

  if (isFetchingAuthors || isFetchingBook) return <Loader />

  return (
    <BasicForm
      onSubmit={onSubmit}
      title="Отредактировать книгу"
      methods={methods}
      buttonText="Отредактировать"
    >
      <TextInput name="name" label="Имя" />
      <Select
        {...methods.register('authorId')}
        value={age}
        // defaultValue={getDataById.author}
        label="Автор"
        onChange={handleChange}
      >
        {authors.map((item) => (
          <MenuItem value={item.id} key={item.id}>
            {item.name} {item.surname} {item.patronymic}
          </MenuItem>
        ))}
      </Select>
      <input accept="image/*" type="file" {...methods.register('image')} />
    </BasicForm>
  )
}
