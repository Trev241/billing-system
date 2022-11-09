import { useContext } from 'react'
import { Outlet, Navigate } from 'react-router-dom'

import AuthContext from '../AuthProvider'

const PrivateRoutes = () => {
    const { auth } = useContext(AuthContext)

    return (
        auth.authenticated ? <Outlet/> : <Navigate to="/signin"/>
    )
}

export default PrivateRoutes