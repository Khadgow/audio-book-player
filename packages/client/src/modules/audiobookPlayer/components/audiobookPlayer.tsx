import { Audio as AudioInterface } from 'modules/books'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import PlayArrowIcon from '@mui/icons-material/PlayArrow'
import PauseIcon from '@mui/icons-material/Pause'
import Stack from '@mui/material/Stack'
import Slider from '@mui/material/Slider'
import VolumeDown from '@mui/icons-material/VolumeDown'
import VolumeUp from '@mui/icons-material/VolumeUp'
import IconButton from '@mui/material/IconButton'
import { useSelector } from 'react-redux'
import {
  selectCurrentAudio,
  selectCurrentAudiobook,
  selectCurrentUser,
  useAppDispatch,
} from 'store'
import { createAudioUrl } from 'utils/createAudioUrl'
import { useCallback, useEffect, useState } from 'react'
import { createImageUrl } from 'utils/createImageUrl'
import { createShortName } from 'utils/createShortName'
import { toHHMMSS } from 'utils/toHHMMSS'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import { audiobookPlayerActions } from 'modules/audiobookPlayer/slice'
import io, { Socket } from 'socket.io-client'
import { useGetLastHistoryQuery } from 'modules/history'

const audio = new Audio()

export const AudiobookPlayer = () => {
  const audioObj = useSelector(selectCurrentAudio)
  const audiobook = useSelector(selectCurrentAudiobook)
  const user = useSelector(selectCurrentUser)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [volume, setVolume] = useState(
    localStorage.getItem('savedVolume')
      ? Number(localStorage.getItem('savedVolume'))
      : 0.5
  )
  const [isShowGroup, setIsShowGroup] = useState(false)
  const [socket, setSocket] = useState<Socket | null>(null)

  const dispatch = useAppDispatch()

  const { data: history, isSuccess } = useGetLastHistoryQuery(undefined, {
    skip: !user,
  })

  useEffect(() => {
    if (isSuccess && history) {
      dispatch(
        audiobookPlayerActions.setAudioAndAudiobook({
          audiobook: {
            ...history.audiobook,
            author: history.audiobook.book.author,
          },
          audio: { ...history.audio, time: history.time },
        })
      )
    }
  }, [dispatch, history, isSuccess])

  useEffect(() => {
    if (audioObj) {
      setCurrentTime(0)
      audio.src = createAudioUrl(audioObj.audioUrl)
      if (audioObj.playNow) {
        audio.play()
      } else {
        setIsPlaying(false)
      }
      if (audioObj.time) {
        audio.currentTime = audioObj.time
        setCurrentTime(audioObj.time)
      }
    }
  }, [audioObj])

  useEffect(() => {
    if (user) {
      const newSocket = io(import.meta.env.VITE_BASE_API_URL, {
        extraHeaders: {
          Authorization: `Bearer ${localStorage.getItem('USER_TOKEN')}`,
        },
      })
      setSocket(newSocket)
    }
  }, [user])

  useEffect(() => {
    if (!user && socket) {
      socket.close()
      setSocket(null)
    }
  }, [socket, user])

  useEffect(() => {
    audio.onended = () => {
      const nextAudio = audiobook?.audio[audioObj?.position + 1]
      if (nextAudio) {
        dispatch(
          audiobookPlayerActions.setAudio({ ...nextAudio, playNow: true })
        )
      }
    }
  }, [audioObj, audiobook, dispatch])

  useEffect(() => {
    if (audio) {
      if (isPlaying) {
        audio.play()
      } else {
        audio.pause()
      }
    }
  }, [isPlaying])

  useEffect(() => {
    if (audio) {
      audio.volume = volume
      localStorage.setItem('savedVolume', String(volume))
    }
  }, [volume])

  useEffect(() => {
    const timer = setInterval(() => {
      if (audio && !audio.paused) {
        setCurrentTime(audio.currentTime)
        socket?.emit(
          'history',
          JSON.stringify({
            time: audio.currentTime,
            audioId: audioObj?.id,
            audiobookId: audiobook?.id,
          })
        )
      }
    }, 500)
    return () => {
      clearTimeout(timer)
    }
  }, [audioObj?.id, audiobook?.id, socket])

  const onPlayPause = useCallback(() => {
    setIsPlaying((prevState) => !prevState)
  }, [])

  const onChangeTime = useCallback((event: Event, value: number) => {
    setCurrentTime(value)
    if (audio) {
      audio.currentTime = value
    }
  }, [])

  const onChangeVolume = useCallback((event: Event, value: number) => {
    setVolume(value)
  }, [])

  const onToggleGroup = useCallback(
    () => setIsShowGroup((prevState) => !prevState),
    []
  )

  const onSelectAudio = useCallback(
    (audio: AudioInterface) => () => {
      dispatch(audiobookPlayerActions.setAudio(audio))
    },
    [dispatch]
  )

  if (!audiobook) {
    return null
  }

  return (
    <>
      {isShowGroup && (
        <Box
          sx={{
            position: 'fixed',
            bottom: '10vh',
            width: '320px',
            maxHeight: '150px',
            zIndex: 1500,
            color: 'white',
            padding: '5px',
            overflowY: 'scroll',
          }}
          bgcolor="primary.main"
        >
          <Stack>
            {audiobook.audio.map((audio) => (
              <Box
                key={audio.id}
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  cursor: 'pointer',
                  backgroundColor: audioObj?.id === audio.id ? '#2d2d2d' : '',
                }}
                onClick={onSelectAudio(audio)}
              >
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  {audioObj?.id === audio.id && <ChevronRightIcon />}{' '}
                  {audio.name}
                </Box>
                <Box>{toHHMMSS(audio.duration)}</Box>
              </Box>
            ))}
          </Stack>
        </Box>
      )}
      <Grid
        container
        sx={{
          position: 'fixed',
          top: '90vh',
          width: '100vw',
          height: '10vh',
          zIndex: 1500,
          color: 'white',
          padding: '5px',
        }}
        bgcolor="primary.main"
        alignItems="center"
      >
        <>
          <Grid
            item
            container
            xs={2}
            onClick={onToggleGroup}
            sx={{
              cursor: 'pointer',
              transition: '0.5s',
              ':hover': {
                backgroundColor: '#2d2d2d',
              },
            }}
          >
            <img
              alt="Book"
              src={createImageUrl(audiobook.book.imageUrl)}
              style={{
                margin: '5px',
                width: '70px',
                height: '70px',
              }}
            />
            <Box>
              <div>{audiobook.book.name}</div>
              <div>{createShortName(audiobook.author)}</div>
              <div>{createShortName(audiobook.voiceActor)}</div>
            </Box>
          </Grid>
          <Grid item xs={8}>
            <Stack alignItems="center">
              <IconButton color="secondary" onClick={onPlayPause}>
                {isPlaying ? (
                  <PauseIcon fontSize="large" />
                ) : (
                  <PlayArrowIcon fontSize="large" />
                )}
              </IconButton>
              <Stack
                spacing={2}
                direction="row"
                sx={{ mb: 1, width: '100%' }}
                alignItems="center"
              >
                {toHHMMSS(currentTime * 1000)}
                <Slider
                  aria-label="Time"
                  color="secondary"
                  sx={{
                    mx: 2,
                  }}
                  max={audioObj.duration / 1000}
                  min={0}
                  step={0.0001}
                  value={currentTime}
                  onChange={onChangeTime}
                />
                {toHHMMSS(audioObj.duration)}
              </Stack>
            </Stack>
          </Grid>
          <Grid item xs={2}>
            <Stack
              spacing={2}
              direction="row"
              sx={{ mb: 1 }}
              alignItems="center"
            >
              <VolumeDown />
              <Slider
                min={0}
                max={1}
                step={0.01}
                aria-label="Volume"
                color="secondary"
                onChange={onChangeVolume}
                value={volume}
              />
              <VolumeUp />
            </Stack>
          </Grid>
        </>
        )
      </Grid>
    </>
  )
}
