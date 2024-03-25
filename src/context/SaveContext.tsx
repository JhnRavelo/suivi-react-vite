import { createContext, useState } from "react"
import { ProviderProps } from "./AuthContext"

export type Saves = {
    id:number
    name: string
    path: string
    createdAt: string
}[]

type SaveValue = {
    saves: Saves
    setSaves: React.Dispatch<React.SetStateAction<Saves>>
}

const SaveContext = createContext<SaveValue | null>(null)

const SaveProvider = ({ children }: ProviderProps) => {
    const [saves, setSaves] = useState<Saves>([])
    return (
        <SaveContext.Provider value={{ saves, setSaves }}>
            {children}
        </SaveContext.Provider>
    )
}

export { SaveProvider }

export default SaveContext