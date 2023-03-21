import { Navigate, Outlet } from 'react-router-dom'

import { getToken } from './services/token.service'

export const PrivateRoutes = () => {
  return (
    getToken() ? <Outlet/> : <Navigate to='/login'/>
  )
}
