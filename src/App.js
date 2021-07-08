import React,{useState} from 'react'
import { BrowserRouter as Router, Switch, Route,Redirect } from 'react-router-dom'
import LandingPage from './Deck/LandingPage.js'
import Settings from './Deck/Settings/Settings'
import Stats from './Deck/Stats/Stats'
import Login from './Login'



export default function App() {
  const [user, setUser] = useState(null)

 
  return (
   

   
    <div 
     >
      {
        user ? user.name : <div></div>
      }
      
      <Router>

        {user?<LandingPage /> : <Redirect to='./login'/>}{/*the main part of the application*/}

        <Switch>               {/*the menu container in the overview*/}
          <Route path='/stats'>
            <Stats />
          </Route>

          <Route path='/settings'>

            <Settings

            />
          </Route>
          <Route path ='/login' >
            <Login setUser={setUser}/>
          </Route>
          <Route path='/' exact>
          </Route>

          <Route path='/logout'>
          </Route>
        </Switch>

      </Router>
    </div>

  )
}

