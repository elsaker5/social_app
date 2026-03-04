import React from 'react'
import { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import { authContext } from '../context/Authcontext'

export default function ProtectRoutes({children}) {
   const {authToken}= useContext(authContext)
   if(authToken===null){
    return <Navigate to='/login'/>
   }
  return (
    <>
    {children}
    </>
  )
}
