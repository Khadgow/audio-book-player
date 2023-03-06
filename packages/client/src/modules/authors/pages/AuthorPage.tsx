import React from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useGetAuthorByIdQuery, useDeleteAuthorMutation } from '../api'
import { Loader } from 'components/Loader'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import { TextField, Box, Stack } from '@mui/material'
import { routes } from '../routes'

export const AuthorPage = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()

  const { data: getDataById, isFetching } = useGetAuthorByIdQuery({ id })
  const [deleteAuthor] = useDeleteAuthorMutation()

  if (isFetching) return <Loader />

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
    >
      <h2>Автор</h2>

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
          onClick={() => navigate(`/authors/edit/${id}`)}
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
            navigate(routes.authorsList)
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
