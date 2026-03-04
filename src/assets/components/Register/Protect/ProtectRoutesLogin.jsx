import React, { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import { authContext } from '../context/Authcontext'

export default function ProtectRoutesLogin({children}) {
   const {authToken}= useContext(authContext)
   if(authToken){
    return <Navigate to='/home'/>
   }
  return (
    <>
    {children}
    </>


  )
}
