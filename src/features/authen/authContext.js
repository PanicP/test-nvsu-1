import { createContext } from 'react'

const authToken = localStorage.getItem('authToken')
// console.log('getauthtoken', authToken)
export const AuthContext = createContext(authToken)

// export default AuthContext
