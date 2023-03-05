import React from 'react'
import { useForm } from 'react-hook-form'
import { Author } from 'modules/books'
import { routes } from '../routes'
import { useNavigate } from 'react-router-dom'
import { TextInput } from 'components/FormInputs/TextInput'
import { BasicForm } from 'components/BasicForm'
import { useAddVoiceActorMutation } from '../api'

export const VoiceActorCreationForm = () => {
  const navigate = useNavigate()
  const methods = useForm<Omit<Author, 'id'>>()

  const [createVoiceActor] = useAddVoiceActorMutation()

  const onSubmit = (data: Omit<Author, 'id'>) => {
    createVoiceActor(data)
    navigate(routes.voiceActorList)
  }

  return (
    <BasicForm
      onSubmit={onSubmit}
      title="Добавить актера озвучки"
      methods={methods}
      buttonText="Создать"
    >
      <TextInput name="name" label="Имя" />
      <TextInput name="patronymic" label="Отчество" />
      <TextInput name="surname" label="Фамилия" />
    </BasicForm>
  )
}
