import React, { createContext, useState } from "react";
import { ProviderProps } from "./AuthContext";
import { CheckBox } from "../components/Form/Form";

type User = {
    connected?: boolean
    name?: string
    email?: string
    id: number
    phone?: number
    createdAt: string
}

type Users = User[]

type UserContextValue = {
    users: Users
    setUsers: React.Dispatch<React.SetStateAction<Users>>
    user: null | User
    setUser: React.Dispatch<React.SetStateAction<User | null>>
    checkboxUser: string[] | null
    setCheckboxUser: CheckBox
}

const UserContext = createContext<UserContextValue | null>(null)

const UserProvider = ({ children }: ProviderProps) => {
    const [users, setUsers] = useState<Users>([])
    const [user, setUser] = useState<null | User>(null)
    const [checkboxUser, setCheckboxUser] = useState<string[] | null>(null)
    return (
        <UserContext.Provider value={{ users, setUsers, user, setUser, checkboxUser, setCheckboxUser }}>
            {children}
        </UserContext.Provider>
    )
}

export default UserContext

export { UserProvider }

export type { User, Users }