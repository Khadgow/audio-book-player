import React from 'react'
import { useForm } from 'react-hook-form'
import { Author } from 'modules/books'
import { usePostAuthorMutation } from '../api'
import { routes } from '../routes'
import { useNavigate } from 'react-router-dom'
import { TextInput } from 'components/FormInputs/TextInput'
import { BasicForm } from 'components/BasicForm'

export const AuthorCreationForm = () => {
  const navigate = useNavigate()
  const methods = useForm<Omit<Author, 'id'>>()

  const [createAuthor] = usePostAuthorMutation()

  const onSubmit = (data: Omit<Author, 'id'>) => {
    createAuthor(data)
    navigate(routes.authorsList)
  }

  return (
    <BasicForm
      onSubmit={onSubmit}
      title="Добавить автора"
      methods={methods}
      buttonText="Создать"
    >
      <TextInput name="name" label="Имя" />
      <TextInput name="patronymic" label="Отчество" />
      <TextInput name="surname" label="Фамилия" />
    </BasicForm>
  )
}
