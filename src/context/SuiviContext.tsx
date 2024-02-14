import { createContext, useState } from "react"
import { ProviderProps } from "./AuthContext"


export type Suivi = {
    id: number
    tech: string
    type: string
    problem: string
    solution: string
    observation: string
    chantier: string
    client: string
    devis: string
    createdAt: string
}

export type Suivis = Suivi[]

type SuiviContextValue = {
    suivis: Suivis | []
    setSuivis: React.Dispatch<React.SetStateAction<Suivis | []>>
}
const SuiviContext = createContext<SuiviContextValue | null>(null)

const SuiviProvider = ({children}:ProviderProps) => {
    const [suivis, setSuivis] = useState<Suivis | []>([])
    return (
        <SuiviContext.Provider value={{suivis, setSuivis}}>
            {children}
        </SuiviContext.Provider>
    )
}

export {SuiviProvider}

export default SuiviContext
