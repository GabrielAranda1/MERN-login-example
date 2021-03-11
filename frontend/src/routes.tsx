import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import Login from './pages/Login'
import Register from './pages/Register'
import User from './pages/User'

function Router() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path='/' exact component={Login} />
        <Route path='/user/:user_id' component={User} />
        <Route path='/register' component={Register} />
      </Switch>
    </BrowserRouter>
  )
}

export default Router
