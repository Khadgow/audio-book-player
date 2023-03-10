import { FC, useCallback } from 'react'
import { History } from 'modules/history/models'
import Box from '@mui/material/Box'
import { createShortName } from 'utils/createShortName'
import { toHHMMSS } from 'utils/toHHMMSS'
import { useRemoveHistoryMutation } from 'modules/history/api'
import { Button } from '@mui/material'
import { useAppDispatch } from 'store'
import { appActions } from 'store/appSlice'
import { audiobookPlayerActions } from 'modules/audiobookPlayer'

interface HistoryItemProps {
  history: History
}

export const HistoryItem: FC<HistoryItemProps> = ({ history }) => {
  const [removeHistory] = useRemoveHistoryMutation()
  const dispatch = useAppDispatch()

  const onRemove = useCallback(() => {
    removeHistory({ historyId: history.id })
  }, [history.id, removeHistory])

  const onSelect = useCallback(() => {
    dispatch(
      audiobookPlayerActions.setAudioAndAudiobook({
        audiobook: {
          ...history.audiobook,
          author: history.audiobook.book.author,
        },
        audio: { ...history.audio, time: history.time },
      })
    )
  }, [dispatch, history.audio, history.audiobook, history.time])

  return (
    <Box>
      <Box onClick={onSelect}>
        {history.audiobook.book.name}{' '}
        {createShortName(history.audiobook.voiceActor)}
        Текущая запись: {history.audio.name} {toHHMMSS(history.time * 1000)}/
        {toHHMMSS(history.audio.duration)}
      </Box>
      <Button color="warning" onClick={onRemove}>
        Удалить
      </Button>
    </Box>
  )
}
