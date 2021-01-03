import React from 'react'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import NavBar from './NavBar'
import DeckContainer from './Deck/DeckContainer.js'
import Settings from './Deck/Settings/Settings'
import Stats from './Deck/Stats/Stats'

export default function App () {

  return (
  
  <Router>

  <NavBar />

<Switch>

  <Route path='/stats'>

  <Stats/>
 
  </Route>

  <Route path='/settings'>
 
 <Settings/>


</Route>




  <Route path='/' exact>
    <DeckContainer />
  </Route>

  <Route path='/logout'>
  </Route>

</Switch>

</Router>

  )
}

