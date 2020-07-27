import React from 'react'
import './App.css'
import { LoginPage } from './pages'
import { BrowserRouter as BsRouter, Switch, Route } from 'react-router-dom'
import { PrivateRoute } from './components/authen/PrivateRoute'

const App = () => {
    return (
        <BsRouter>
            <Switch>
                <Route exact path="/login" component={ LoginPage }></Route>
                <PrivateRoute exact path="/" component={ () => <div></div> }></PrivateRoute>
            </Switch>
        </BsRouter>
    )
}

export default App
