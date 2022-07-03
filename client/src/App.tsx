import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom'
import { ChakraProvider } from '@chakra-ui/react'

import { SignIn } from './pages/Auth/SignIn'
import { SignUp } from './pages/Auth/SignUp'
import { Home } from './pages/Dashboard/Home'

interface PrivateRouteProps {
  children: JSX.Element
  redirectTo: string
}

const PrivateRoute = ({children, redirectTo}: PrivateRouteProps): JSX.Element => {
  const isAutheticated = localStorage.getItem('token') !== null
  return isAutheticated ? children : <Navigate to={redirectTo} />
}

export const App = () => {
  return (
    <ChakraProvider>
      <Router>
        <Routes>
          <Route path='/' element={<SignIn />}/>
          <Route path='/signup' element={<SignUp />}/>
          <Route path='/home' element={<PrivateRoute redirectTo='/'><Home /> </PrivateRoute>}/>
        </Routes>
      </Router>
    </ChakraProvider>
  )
}

