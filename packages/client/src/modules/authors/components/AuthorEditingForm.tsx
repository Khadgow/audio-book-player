import React from 'react'
import { useForm } from 'react-hook-form'
import { Author } from 'modules/books'
import { useEditAuthorMutation, useGetAuthorByIdQuery } from '../api'
import { routes } from '../routes'
import { useNavigate, useParams } from 'react-router-dom'
import { TextInput } from 'components/FormInputs/TextInput'
import { BasicForm } from 'components/BasicForm'
import { isEqual } from 'lodash'
import { Loader } from 'components/Loader'

export const AuthorEditingForm = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const methods = useForm<Omit<Author, 'id'>>()

  const [editAuthor] = useEditAuthorMutation()
  const { data: getDataById, isFetching } = useGetAuthorByIdQuery({ id })

  const onSubmit = (data: Omit<Author, 'id'>) => {
    if (!isEqual({ ...data, id }, getDataById)) editAuthor({ ...data, id })
    navigate(routes.authorsList)
  }

  if (isFetching) return <Loader />

  return (
    <BasicForm
      onSubmit={onSubmit}
      title="Отредактировать автора"
      methods={methods}
      buttonText="Отредактировать"
    >
      <TextInput name="name" label="Имя" defaultValue={getDataById.name} />
      <TextInput
        name="patronymic"
        label="Отчество"
        defaultValue={getDataById.patronymic}
      />
      <TextInput
        name="surname"
        label="Фамилия"
        defaultValue={getDataById.surname}
      />
    </BasicForm>
  )
}
