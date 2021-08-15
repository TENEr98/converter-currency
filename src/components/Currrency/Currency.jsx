import React, { useEffect, useState } from 'react'
import { Table } from 'rsuite'
import { ConverterAPI } from '../../api'

import './Currency.scss'

const { Column, HeaderCell, Cell, Pagination } = Table

const Currency = ({ baseCurr = 'USD' }) => {
  const [currencyList, setCurrencyList] = useState([])
  const [loading, setLoading] = useState(true)

  const updateTable = async () => {
    const response = await ConverterAPI.fetchAll(baseCurr)
    return response.data
  }

  const autoUpdate = async () => {
    const temp = []
    setLoading(true)
    const { results } = await updateTable()
    setLoading(false)

    Object.entries(results).forEach(([key, value]) => {
      temp.push({
        currencies: key,
        currencies_exchange: value
      })
    })
    setCurrencyList(temp)
  }

  useEffect(() => {
    setInterval(
      (function foo() {
        autoUpdate()
        return foo
      })(),
      15000
    )
    return () => {
      setCurrencyList([])
    }
  }, [baseCurr])

  return (
    <div className="Curr_Wrapper">
      <Table height={600} data={currencyList} loading={loading}>
        <Column width={90} align="center" fixed>
          <HeaderCell>Валюта</HeaderCell>
          <Cell dataKey="currencies" />
        </Column>
        <Column width={150} align="center" fixed>
          <HeaderCell>Перевод Валюты</HeaderCell>
          <Cell dataKey="currencies_exchange" />
        </Column>
      </Table>
    </div>
  )
}

export default Currency
