import React from 'react'
import './App.css'
import { LoginPage, TaskPage } from './pages'
import { BrowserRouter as BsRouter, Switch, Route } from 'react-router-dom'
import { PrivateRoute } from './components/authen/PrivateRoute'
import { AuthContext } from './features/authen'

// const authToken = localStorage.getItem('authToken')

const App = () => {
    return (
        <AuthContext.Provider>
            <BsRouter>
                <Switch>
                    <Route exact path="/login" component={LoginPage}></Route>
                    <PrivateRoute
                        exact
                        path="/"
                        // authToken={authToken}
                        component={TaskPage}
                    ></PrivateRoute>
                </Switch>
            </BsRouter>
        </AuthContext.Provider>
    )
}

export default App
