import { DropResult } from 'react-beautiful-dnd'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Form } from 'modules/audiobook/components/Form'
import { Audiobook } from 'modules/audiobook/models'
import { useGetAuthorsQuery } from 'modules/authors'
import { useGetVoiceActorQuery } from 'modules/voiceActor/api'
import { createShortName } from 'utils/createShortName'
import { Box } from '@mui/material'
import { useGetBooksQuery } from 'modules/books'

export const AudiobookForm = () => {
  const methods = useForm<Audiobook>()

  const { data: books, isFetching: isBooksFetching } = useGetBooksQuery()
  const { data: voiceActors, isFetching: isVoiceActorsFetching } =
    useGetVoiceActorQuery()

  const booksOptions = books?.map((book) => ({
    value: book.id,
    label: book.name,
  }))

  const voiceActorOptions = voiceActors?.map((voiceActor) => ({
    value: voiceActor.id,
    label: createShortName(voiceActor),
  }))

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
    >
      <h2>Аудиокнига</h2>
      <Form
        methods={methods}
        booksOptions={booksOptions}
        voiceActorOptions={voiceActorOptions}
        isBooksFetching={isBooksFetching}
        isVoiceActorsFetching={isVoiceActorsFetching}
      />
    </Box>
  )
}
