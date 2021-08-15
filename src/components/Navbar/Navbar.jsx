import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { Icon, SelectPicker } from 'rsuite'
import { ConverterAPI } from '../../api'
import { notify } from '../../utils/Notification'

import './Navbar.scss'

const Navbar = ({ baseCurr, setBaseCurr }) => {
  const [currencyList, setCurrencyList] = useState([])
  const [activeLink, setActiveList] = useState(window.location.pathname !== '/')

  const updateCurrencyList = async () => {
    try {
      const response = await ConverterAPI.currencies()
      const temp = []
      if (response.status === 200) {
        Object.entries(response.data.currencies).forEach(([key, value]) => {
          temp.push({
            label: key,
            value: key
          })
        })
        setCurrencyList(temp)
      } else {
        throw new Error()
      }
    } catch (error) {
      notify(error, 'Произошла ошибка', 'error')
    }
  }

  const onSelectCurr = (value) => {
    setBaseCurr(value)
  }

  useEffect(() => {
    ;(async () => {
      await updateCurrencyList()
    })()
    setBaseCurr('USD')

    return () => {
      setCurrencyList([])
    }
  }, [])
  return (
    <div className="Wrapper_Navbar">
      <div className="Block_Navlinks">
        <div className={`Item ${!activeLink ? 'active' : ''}`}>
          <NavLink
            to="/"
            className="Navlink"
            onClick={() => setActiveList(false)}
          >
            Конвертер
          </NavLink>
        </div>
        <div className={`Item ${activeLink ? 'active' : ''}`}>
          <NavLink
            to="/currency"
            className="Navlink"
            onClick={() => setActiveList(true)}
          >
            Валюты
          </NavLink>
        </div>
      </div>
      <div className="Base_Currency">
        <SelectPicker
          data={currencyList}
          placeholder="Выберите"
          placement="leftStart"
          cleanable={false}
          onChange={(value) => onSelectCurr(value)}
          value={baseCurr}
          renderMenu={(menu) => {
            if (currencyList.length === 0) {
              return (
                <p style={{ padding: 4, color: '#999', textAlign: 'center' }}>
                  <Icon icon="spinner" spin /> Загрузка...
                </p>
              )
            }
            return menu
          }}
        />
      </div>
    </div>
  )
}

export default Navbar
