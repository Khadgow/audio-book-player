import React from 'react'
import ReactDOM from 'react-dom/client'
import { App } from 'App'
import './index.css'

import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'

import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from 'store'
import { ThemeProvider } from '@mui/material'
import { theme } from 'theme'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ThemeProvider>
    </Provider>
  </React.StrictMode>
)
