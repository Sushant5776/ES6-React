import React, { Fragment, useState, useRef, useEffect } from 'react'
import { Button, InputGroup, FormControl, Form } from 'react-bootstrap'
import data from './settings.json'
import axios from 'axios'

function Weather() {

  const [temp, setTemp] = useState({})
  const [inputVal, setInputVal] = useState('')
  const inputRef = useRef()

  const handleInputChange = (e) => {
    setInputVal(() => e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setInputVal(() => '')
    axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${inputVal}&appid=${data['api-key']}`)
      .then(res => { setTemp(() => res.data.main) })
      .catch(err => { setTemp(() => { return {} }) })

    inputRef.current.value = ''
    inputRef.current.focus()
  }

  useEffect(() => {
    inputRef.current.focus()
  }, [])

  return (
    <Fragment>
      <div id='tempDiv' className='mb-3'>
        {
          Object.keys(temp).length > 1 ?
            <Fragment>
              <p>It feels like <b>{(temp.feels_like - data.kelvin).toFixed(data.roundTemp)} {data.degreeSymbol}</b><i>C</i><br />
              Pressure is <b>{temp.pressure}</b> <i>hPa</i></p>
            </Fragment> :
            <p className="text-danger">No data to show!</p>
        }
      </div>
      <Form onSubmit={handleSubmit}>
        <InputGroup>
          <FormControl
            placeholder='City Name'
            aria-label='City Name'
            value={inputVal}
            onChange={handleInputChange}
            ref={inputRef}
          />
          <InputGroup.Append>
            <Button type='submit' variant='outline-success'>Get Weather</Button>
          </InputGroup.Append>
        </InputGroup>
      </Form>
    </Fragment>
  )
}

export default Weather
