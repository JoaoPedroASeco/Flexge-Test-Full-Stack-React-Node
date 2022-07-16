import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'

import { BrowserRouter } from 'react-router-dom'
import './styles/global.css'
import { Provider } from 'react-redux'
import store from './store'
import { StudentProvider } from './contexts/StudentContext'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <React.StrictMode>
      <Provider store={store}>
        <StudentProvider>
          <App />
        </StudentProvider>
      </Provider>
    </React.StrictMode>
  </BrowserRouter>
)
