import { createSlice } from '@reduxjs/toolkit'
import { Audio, AudiobookWithBookInfo } from 'modules/books/models'

const name = '@@audiobookPlayer'

export interface AudiobookPlayerState {
  selectedAudiobook?: AudiobookWithBookInfo
  selectedAudio?: Audio
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
      state.selectedAudio = payload.audio
      state.selectedAudiobook = payload.audiobook
    },
  },
})

export const {
  actions: audiobookPlayerActions,
  reducer: audiobookPlayerReducer,
} = audiobookPlayerSlice
