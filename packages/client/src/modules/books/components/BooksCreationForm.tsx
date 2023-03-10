import React, { useState } from 'react'
import { BasicForm } from '../../../components/BasicForm'
import { TextInput } from '../../../components/FormInputs'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { ChangeBook } from '../models'
import { routes } from '../routes'
import MenuItem from '@mui/material/MenuItem'
import { useAddBookMutation } from '../api'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import { useGetAuthorsQuery } from '../../authors'
import { Loader } from '../../../components/Loader'

export const BooksCreationForm = () => {
  const navigate = useNavigate()
  const methods = useForm<Omit<ChangeBook, 'id'>>()

  const { data: authors, isFetching } = useGetAuthorsQuery()
  const [age, setAge] = React.useState('')
  const [imageUrl, setImageUrl] = useState<string | null>(null)

  const [addBookRequest] = useAddBookMutation()

  const onSubmit = (data: Omit<ChangeBook, 'id'>) => {
    const formData = new FormData()

    formData.append('name', data.name)

    formData.append('authorId', data.authorId)
    formData.append('image', data.image[0])

    addBookRequest(formData)

    navigate(routes.booksList)
  }

  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value as string)
  }
  if (isFetching) return <Loader />

  return (
    <BasicForm
      onSubmit={onSubmit}
      title="Добавить книгу"
      methods={methods}
      buttonText="Создать"
    >
      <TextInput name="name" label="Имя" />
      <Select
        {...methods.register('authorId')}
        value={age}
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
      {imageUrl ? <img alt="img" src={imageUrl} /> : <div></div>}
    </BasicForm>
  )
}
