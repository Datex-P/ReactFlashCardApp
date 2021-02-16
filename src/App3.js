import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import LandingPage from './Deck/LandingPage.js'
import Settings from './Deck/Settings/Settings'
import Stats from './Deck/Stats/Stats'



export default function App() {

  return (

    <Router>
    
      <LandingPage />

      <Switch>
          <Route path='/stats'>
              <Stats />
          </Route>

          <Route path='/settings'>
              <Settings />
          </Route>

          <Route path='/' exact>            
          </Route>

          <Route path='/logout'>
          </Route>
      </Switch>

    </Router>

  )
}
