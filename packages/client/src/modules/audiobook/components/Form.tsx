import { DragDropContext, Draggable, DropResult } from 'react-beautiful-dnd'
import {
  BaseSyntheticEvent,
  FC,
  useState,
  useCallback,
  ChangeEvent,
  useEffect,
} from 'react'
import { AudioItem } from 'modules/audiobook/components/AudioItem'
import { StrictModeDroppable } from 'components/StrictModeDroppable'
import { FormProvider, UseFormReturn } from 'react-hook-form'
import { Audiobook } from 'modules/audiobook/models'
import { TextInput, Selector } from 'components/FormInputs'
import { Button, Stack } from '@mui/material'
import UploadFileIcon from '@mui/icons-material/UploadFile'
import { useDropzone } from 'react-dropzone'
import { useLoginMutation } from 'modules/auth'
import { useCreateAudiobookMutation } from 'modules/audiobook/api'
import { useNavigate } from 'react-router-dom'

interface FormProps {
  methods: UseFormReturn<Audiobook>
  booksOptions: { value: string; label: string }[]
  voiceActorOptions: { value: string; label: string }[]
  isBooksFetching: boolean
  isVoiceActorsFetching: boolean
}

export const Form: FC<FormProps> = ({
  methods,
  booksOptions,
  voiceActorOptions,
  isBooksFetching,
  isVoiceActorsFetching,
}) => {
  const [files, setFiles] = useState<{ name: string; file: File }[]>([])
  const [createAudiobook, { isSuccess }] = useCreateAudiobookMutation()
  const navigate = useNavigate()

  useEffect(() => {
    if (isSuccess) {
      navigate('/books')
    }
  }, [isSuccess, navigate])

  const onDrop = useCallback((acceptedFiles) => {
    const newFiles = acceptedFiles.map((file) => ({
      file,
      name: file.name.split('.')[0],
    }))

    setFiles((prevState) => [...prevState, ...newFiles])
  }, [])
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'audio/*': [],
    },
  })

  const reorder = (list: Array<any>, startIndex: number, endIndex: number) => {
    const result = Array.from(list)
    const [removed] = result.splice(startIndex, 1)
    result.splice(endIndex, 0, removed)

    return result
  }

  const onChange =
    (index: number) => (event: ChangeEvent<HTMLInputElement>) => {
      setFiles((prevState) => {
        const files = [...prevState]
        const [removed] = files.splice(index, 1)
        removed.name = event.target.value
        files.splice(index, 0, removed)
        return files
      })
    }

  const onDelete = (index: number) => () => {
    setFiles((prevState) => {
      return [...prevState.slice(0, index), ...prevState.slice(index + 1)]
    })
  }

  const onDragEnd = useCallback(
    (dropResult: DropResult) => {
      if (!dropResult.destination) {
        return
      }

      const items = reorder(
        files,
        dropResult.source.index,
        dropResult.destination.index
      )

      setFiles(items)
    },
    [files]
  )

  const onSubmit = methods.handleSubmit((data) => {
    const formData = new FormData()
    formData.append('name', data.name)
    formData.append('bookId', data.bookId)
    formData.append('voiceActorId', data.voiceActorId)
    files.forEach((audio, index) => {
      formData.append(`${index}|${audio.name}`, audio.file)
    })
    createAudiobook(formData)
  })

  return (
    <FormProvider {...methods}>
      <form onSubmit={onSubmit}>
        <Stack
          spacing={2}
          style={{
            width: '350px',
          }}
        >
          <TextInput name="name" label="Название" />
          <Selector
            name="bookId"
            options={booksOptions}
            isLoading={isBooksFetching}
            placeholder="Книга"
          />
          <Selector
            name="voiceActorId"
            options={voiceActorOptions}
            isLoading={isVoiceActorsFetching}
            placeholder="Актёр озвучки"
          />

          <div
            {...getRootProps()}
            style={{
              height: '50px',
              border: 'solid 1px #CCCCCC',
              borderRadius: '3px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
            }}
          >
            <input {...getInputProps()} />
            {isDragActive ? <p>Перетащите сюда ...</p> : <UploadFileIcon />}
          </div>
          <DragDropContext onDragEnd={onDragEnd}>
            <StrictModeDroppable droppableId="droppable">
              {(provided) => (
                <div {...provided.droppableProps} ref={provided.innerRef}>
                  {files.map((audio, index) => (
                    <Draggable
                      key={audio.name}
                      draggableId={audio.name}
                      index={index}
                    >
                      {(provided) => (
                        <AudioItem
                          name={audio.name}
                          onChange={onChange(index)}
                          onDelete={onDelete(index)}
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        />
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </StrictModeDroppable>
          </DragDropContext>
          <Button type="submit">Создать</Button>
        </Stack>
      </form>
    </FormProvider>
  )
}
