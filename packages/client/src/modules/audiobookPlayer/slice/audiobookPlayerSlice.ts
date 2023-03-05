import { createSlice } from '@reduxjs/toolkit'
import { Audio, AudiobookWithBookInfo } from 'modules/books'

const name = '@@audiobookPlayer'

type AudioWithPlayerInfo = Audio & {
  playNow?: boolean
  time?: number
}

export interface AudiobookPlayerState {
  selectedAudiobook?: AudiobookWithBookInfo
  selectedAudio?: AudioWithPlayerInfo
}

const initialState: AudiobookPlayerState = {
  selectedAudiobook: undefined,
}

export const audiobookPlayerSlice = createSlice({
  name,
  initialState,
  reducers: {
    setAudiobook(state, { payload }) {
      state.selectedAudiobook = payload
    },
    setAudio(state, { payload }) {
      state.selectedAudio = payload
    },
    setAudioAndAudiobook(state, { payload }) {
      state.selectedAudiobook = payload.audiobook
      state.selectedAudio = payload.audio
    },
  },
})

export const {
  actions: audiobookPlayerActions,
  reducer: audiobookPlayerReducer,
} = audiobookPlayerSlice
