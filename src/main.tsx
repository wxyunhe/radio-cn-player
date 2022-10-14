import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

import { APIType, getData } from './services/api'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)

getData({
  name: APIType.getRadioProvinceList,
})