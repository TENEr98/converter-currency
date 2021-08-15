import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { IntlProvider } from 'rsuite'
import ruRU from 'rsuite/lib/IntlProvider/locales/ru_RU'
import format from 'date-fns/format'
import ru from 'date-fns/locale/ru'

import './index.css'

function formatDate(data, formatStr) {
  return format(data, formatStr, { locale: ru })
}

ReactDOM.render(
  <IntlProvider locale={ruRU} formatDate={formatDate}>
    <App />
  </IntlProvider>,
  document.getElementById('root')
)
