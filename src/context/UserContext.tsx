import React, { createContext, useState } from "react";
import { ProviderProps } from "./AuthContext";

type User = {
    connected?: boolean
    name: string 
    email?: string
    id: number 
    phone?: number 
    createdAt: string 
}

type Users = User[]

type UserContextValue = {
    users: [] | undefined | Users
    setUsers: React.Dispatch<React.SetStateAction<Users | []>>
    user: null | User
    setUser: null | React.Dispatch<React.SetStateAction<User | null>>
}

const UserContext = createContext<UserContextValue | null>(null)

const UserProvider = ({ children }: ProviderProps) => {
    const [users, setUsers] = useState<[] | Users>([])
    const [user, setUser] = useState<null | User>(null)
    return (
        <UserContext.Provider value={{ users, setUsers, user, setUser }}>
            {children}
        </UserContext.Provider>
    )
}

export default UserContext

export { UserProvider }

export type { User, Users }