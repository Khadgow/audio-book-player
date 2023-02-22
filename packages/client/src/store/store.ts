import { configureStore } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'

import { authApi } from 'modules/auth'
import { booksApi } from 'modules/books'
import { appReducer } from 'store/appSlice'

export const createStore = () =>
  configureStore({
    reducer: {
      [authApi.reducerPath]: authApi.reducer,
      [booksApi.reducerPath]: booksApi.reducer,
      app: appReducer,
    },
    middleware: (getDefaultMiddleware) => [
      ...getDefaultMiddleware(),
      authApi.middleware,
      booksApi.middleware,
    ],
  })

export const store = createStore()

export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>()
export type RootState = ReturnType<typeof store.getState>
export const selectCurrentUser = (state: RootState) => state.app.currentUser
