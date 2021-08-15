import React, { useEffect, useState } from 'react'
import { Button, ControlLabel, Input } from 'rsuite'
import { ConverterAPI } from '../../api'
import { notify } from '../../utils/Notification'

import './Converter.scss'

const Converter = ({ baseCurr }) => {
  const [form, setForm] = useState('')
  const [result, setResult] = useState(null)

  const onFormChange = (value) => setForm(value.toUpperCase())

  const onConvert = async () => {
    const pattern = /(\d{1,})\s([A-Z]{3})\s(IN)\s([A-Z]{3})$/gm
    const temp = [...form.matchAll(pattern)]
    if (temp.length !== 1) {
      return notify('Заполните по примеру', '', 'warning')
    }
    try {
      const response = await ConverterAPI.convert(
        temp[0][2],
        temp[0][4],
        temp[0][1]
      )
      console.log(response)
      setResult({
        from: response.data.base,
        to: temp[0][4],
        rate: response.data.result.rate,
        exchange: response.data.result[temp[0][4]],
        amount: temp[0][1]
      })
    } catch (error) {
      notify('Произошла ошибка', '', 'error')
      setResult(null)
    }
  }

  return (
    <div className="Conv_Wrapper">
      <div className="Conv_Block">
        <div className="Form">
          <div className="Conv_Sample">
            <h4 className="">Пример: 23 USD IN RUB</h4>
          </div>
          <ControlLabel>Конвертер</ControlLabel>
          <Input value={form} onChange={onFormChange} />
        </div>
        <div className="Submit">
          <Button onClick={onConvert}>Конвертировать</Button>
        </div>
        {result && (
          <div className="Conv_Result">
            <h4>
              Соотношение 1 {result?.from} к {result?.rate} {result?.to}
            </h4>
            <h4>
              Соотношение {result?.amount} {result?.from} к {result?.exchange}{' '}
              {result?.to}
            </h4>
          </div>
        )}
      </div>
    </div>
  )
}

export default Converter
