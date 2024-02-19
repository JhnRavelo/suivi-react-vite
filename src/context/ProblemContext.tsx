import { createContext, useState } from "react"
import { ProviderProps } from "./AuthContext"

export type Problems = Problem[]

export type Problem = {
    id: number
    name: string
    productTypeId: number
}

type ProblemValue = {
    problems: Problems | [] | undefined
    setProblems: React.Dispatch<React.SetStateAction<Problems | []>>
    problemsByType: Problems | [] | undefined
    setProblemsByType: React.Dispatch<React.SetStateAction<Problems | []>>

}

const ProblemContext = createContext<ProblemValue | null>(null)

const ProblemProvider = ({ children }: ProviderProps) => {
    const [problems, setProblems] = useState<[] | Problems>([])
    const [problemsByType, setProblemsByType] = useState<[] | Problems>([])
    return (
        <ProblemContext.Provider value={{
            problems, setProblems, problemsByType, setProblemsByType
        }}>
            {children}
        </ProblemContext.Provider>
    )
}

export default ProblemContext

export { ProblemProvider }

