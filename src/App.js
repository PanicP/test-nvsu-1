import React from 'react'
import './App.css'
import { LoginPage } from './pages'
import { BrowserRouter as BsRouter, Switch, Route } from 'react-router-dom'

const App = () => {
    return (
        <BsRouter>
            <Switch>
                <Route exact path="/" component={ LoginPage }></Route>
            </Switch>
        </BsRouter>
    )
}

export default App
