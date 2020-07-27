import { createContext } from 'react'

export const AuthContext = createContext(localStorage.getItem('authToken'))

