import { configureStore } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'

import { authApi } from 'modules/auth'
import { booksApi } from 'modules/books'
import { appReducer } from 'store/appSlice'
import { audiobookPlayerReducer } from 'modules/audiobookPlayer'
import { authorsApi } from 'modules/authors/api'
import { voiceActorApi } from '../modules/voiceActor/api'

export const createStore = () =>
  configureStore({
    reducer: {
      [authApi.reducerPath]: authApi.reducer,
      [booksApi.reducerPath]: booksApi.reducer,
      [authorsApi.reducerPath]: authorsApi.reducer,
      [voiceActorApi.reducerPath]: voiceActorApi.reducer,
      app: appReducer,
      audiobookPlayer: audiobookPlayerReducer,
    },
    middleware: (getDefaultMiddleware) => [
      ...getDefaultMiddleware(),
      authApi.middleware,
      booksApi.middleware,
      authorsApi.middleware,
      voiceActorApi.middleware,
    ],
  })

export const store = createStore()

export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>()
export type RootState = ReturnType<typeof store.getState>
export const selectCurrentUser = (state: RootState) => state.app.currentUser
export const selectCurrentAudiobook = (state: RootState) =>
  state.audiobookPlayer.selectedAudiobook

export const selectCurrentAudio = (state: RootState) =>
  state.audiobookPlayer.selectedAudio
