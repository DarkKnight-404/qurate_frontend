import React from 'react'
import Login from './Login'

function AuthRoutes({ children, loginRequire = false, state = "success" }) {

    if(!loginRequire) return children
    else{
        if(localStorage.getItem("logged_status")===state){
            return children;
        }
        else{
            return <Login/>
        }
    }
    
}

export default AuthRoutes
