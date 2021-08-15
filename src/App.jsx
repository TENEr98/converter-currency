import React, { useState } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { Navbar } from './components/Navbar'
import { Currency } from './components/Currrency'
import { Converter } from './components/Converter'

import './App.scss'

const App = () => {
  const [baseCurr, setBaseCurr] = useState('')
  return (
    <div className="Wrapper">
      <Router>
        <Navbar baseCurr={baseCurr} setBaseCurr={setBaseCurr} />
        <Switch>
          <Route exact path="/" render={() => <Converter />} />
          <Route
            exact
            path="/currency"
            render={() => <Currency baseCurr={baseCurr} />}
          />
        </Switch>
      </Router>
    </div>
  )
}

export default App
