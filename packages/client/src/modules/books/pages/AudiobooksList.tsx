import { useParams } from 'react-router-dom'
import { useGetBookByIdQuery } from 'modules/books/api'
import { Loader } from 'components/Loader'
import { toHHMMSS } from 'utils/toHHMMSS'
import { useCallback } from 'react'
import { useAppDispatch } from 'store'
import { audiobookPlayerActions } from 'modules/audiobookPlayer'
import { Audio, Audiobook } from 'modules/books/models'
import { createShortName } from 'utils/createShortName'

export const AudiobooksList = () => {
  const { id } = useParams<{ id: string }>()

  const { data, isFetching } = useGetBookByIdQuery({ id })

  const dispatch = useAppDispatch()
  const { author, audiobooks, ...book } = data || {}

  const selectAudiobook = useCallback(
    (audiobook: Audiobook, audio: Audio) => () => {
      dispatch(
        audiobookPlayerActions.setAudiobook({
          ...audiobook,
          author,
          book,
        })
      )
      dispatch(audiobookPlayerActions.setAudio(audio))
    },
    [author, book, dispatch]
  )

  console.log('audiobooks', audiobooks)
  if (isFetching) {
    return <Loader />
  }
  if (!data) {
    return 'Нету данных'
  }

  return (
    <div>
      {audiobooks.map((audiobook) => (
        <div key={audiobook.id}>
          {audiobook.name} {audiobook.duration}{' '}
          {createShortName(audiobook.voiceActor)}
          {audiobook.audio.map((audio) => (
            <div
              style={{ marginLeft: '20px', cursor: 'pointer' }}
              key={audio.id}
              onClick={selectAudiobook(audiobook, audio)}
            >
              {audio.name} {toHHMMSS(audio.duration)}
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}
