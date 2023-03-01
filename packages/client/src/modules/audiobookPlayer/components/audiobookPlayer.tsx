import { Box, Grid } from '@mui/material'
import PlayArrowIcon from '@mui/icons-material/PlayArrow'
import PauseIcon from '@mui/icons-material/Pause'
import Stack from '@mui/material/Stack'
import Slider from '@mui/material/Slider'
import VolumeDown from '@mui/icons-material/VolumeDown'
import VolumeUp from '@mui/icons-material/VolumeUp'
import IconButton from '@mui/material/IconButton'
import { useSelector } from 'react-redux'
import { selectCurrentAudio, selectCurrentAudiobook } from 'store'
import { createAudioUrl } from 'utils/createAudioUrl'
import { useCallback, useEffect, useState } from 'react'
import { createImageUrl } from 'utils/createImageUrl'
import { createShortName } from 'utils/createShortName'
import { toHHMMSS } from 'utils/toHHMMSS'

export const AudiobookPlayer = () => {
  const audioObj = useSelector(selectCurrentAudio)
  const audiobook = useSelector(selectCurrentAudiobook)
  const [audio, setAudio] = useState<HTMLAudioElement>(new Audio())
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [volume, setVolume] = useState(
    localStorage.getItem('savedVolume')
      ? Number(localStorage.getItem('savedVolume'))
      : 0.5
  )

  useEffect(() => {
    if (audioObj) {
      setCurrentTime(0)
      setIsPlaying(false)
      audio.src = createAudioUrl(audioObj.audioUrl)
    }
  }, [audio, audioObj])

  useEffect(() => {
    if (audio) {
      if (isPlaying) {
        audio.play()
      } else {
        audio.pause()
      }
    }
  }, [audio, isPlaying])

  // useEffect(() => {
  //   if (audio) {
  //     audio.currentTime = currentTime
  //   }
  // }, [audio, currentTime])

  useEffect(() => {
    if (audio) {
      audio.volume = volume
      localStorage.setItem('savedVolume', String(volume))
    }
  }, [audio, volume])

  useEffect(() => {
    const timer = setInterval(() => {
      if (audio && !audio.paused) {
        setCurrentTime(audio.currentTime)
      }
    }, 500)
    return () => {
      clearTimeout(timer)
    }
  }, [audio])

  const onPlayPause = useCallback(() => {
    setIsPlaying((prevState) => !prevState)
  }, [])

  const onChangeTime = useCallback(
    (event: Event, value: number) => {
      setCurrentTime(value)
      if (audio) {
        audio.currentTime = value
      }
    },
    [audio]
  )

  const onChangeVolume = useCallback((event: Event, value: number) => {
    setVolume(value)
  }, [])

  return (
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
      {audiobook ? (
        <>
          <Grid item container xs={2}>
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
      ) : (
        <div>Пусто</div>
      )}
    </Grid>
  )
}
