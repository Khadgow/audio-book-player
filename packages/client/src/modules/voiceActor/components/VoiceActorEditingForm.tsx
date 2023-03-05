import React from 'react'
import { useForm } from 'react-hook-form'
import { Author } from 'modules/books'
import { useEditVoiceActorMutation, useGetVoiceActorByIdQuery } from '../api'
import { routes } from '../routes'
import { useNavigate, useParams } from 'react-router-dom'
import { TextInput } from 'components/FormInputs/TextInput'
import { BasicForm } from 'components/BasicForm'
import { isEqual } from 'lodash'
import { Loader } from 'components/Loader'

export const VoiceActorEditingForm = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const methods = useForm<Omit<Author, 'id'>>()

  const [editVoiceActor] = useEditVoiceActorMutation()
  const { data: getDataById, isFetching } = useGetVoiceActorByIdQuery({ id })

  const onSubmit = (data: Omit<Author, 'id'>) => {
    if (!isEqual({ ...data, id }, getDataById)) editVoiceActor({ ...data, id })
    navigate(routes.voiceActorList)
  }

  if (isFetching) return <Loader />

  return (
    <BasicForm
      onSubmit={onSubmit}
      title="Отредактировать актера озвучки"
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
