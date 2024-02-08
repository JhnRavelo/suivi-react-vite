import React, { createContext, useState } from "react";

type AuthUser = {
    role: number | string
    accessToken: string 
    name: string | undefined
    email: string | undefined
}

type ProviderProps = {
    children: React.ReactNode
}

type AuthContextValue = {
    auth: null | AuthUser
    setAuth: React.Dispatch<React.SetStateAction<AuthUser | null>>
}

const AuthContext = createContext<AuthContextValue | null>(null)

const AuthProvider = ({children}:ProviderProps)=>{
    const [auth, setAuth] = useState<null | AuthUser>(null)
    return (
        <AuthContext.Provider value={{auth, setAuth}}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext

export {AuthProvider}
export type {AuthUser, ProviderProps}