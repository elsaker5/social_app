import  { createContext, useEffect, useState } from 'react'
import  { jwtDecode} from 'jwt-decode'
export const authContext=createContext()

export default function AuthcontextProvider({children}) {
    const [authToken, setToken] = useState(function(){
        return localStorage.getItem('tkn')
    })
    const [userId, setUserId] = useState(null)
    function setAuthFunction(tkn){
        setToken(tkn)
    }
    function nullToken(){
        setToken(null)
    }
    function decodeUser(){
   const tokenDecode= jwtDecode(authToken)
   setUserId(tokenDecode.user)
    }
    useEffect(() => {
    if(authToken){
    decodeUser()
    }
    },[authToken])
return (
    <>   
    <authContext.Provider value={{authToken,setAuthFunction,nullToken ,userId}}>
        {children}
    </authContext.Provider>    
    </>
)
}