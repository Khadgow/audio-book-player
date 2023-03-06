import React from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useGetVoiceActorByIdQuery, useDeleteVoiceActorMutation } from '../api'
import { Loader } from 'components/Loader'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import { TextField, Box, Stack } from '@mui/material'
import { routes } from '../routes'

export const VoiceActorPage = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()

  const { data: getDataById, isFetching } = useGetVoiceActorByIdQuery({ id })
  const [deleteAuthor] = useDeleteVoiceActorMutation()

  if (isFetching) return <Loader />

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
    >
      <h2>Актер озвучки</h2>

      <Stack spacing={2} width="300px">
        <TextField
          name="name"
          disabled
          label="Имя"
          defaultValue={getDataById.name}
        />
        <TextField
          name="patronymic"
          label="Отчество"
          disabled
          defaultValue={getDataById.patronymic}
        />
        <TextField
          name="surname"
          label="Фамилия"
          disabled
          defaultValue={getDataById.surname}
        />
      </Stack>
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <EditIcon
          onClick={() => navigate(`/voiceActor/edit/${id}`)}
          style={{
            cursor: 'pointer',
            alignItems: 'center',
            height: '75px',
            marginLeft: '20px',
          }}
        />
        <DeleteIcon
          onClick={() => {
            deleteAuthor(id)
            navigate(routes.voiceActorList)
          }}
          style={{
            cursor: 'pointer',
            alignItems: 'center',
            height: '75px',
            marginLeft: '20px',
          }}
        />
      </div>
    </Box>
  )
}
