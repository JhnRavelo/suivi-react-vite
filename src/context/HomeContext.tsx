import { createContext, useState } from "react";
import { ProviderProps } from "./AuthContext";

type HomeContextValue = {
    statTop: StatProblems
    setStatTop: React.Dispatch<React.SetStateAction<StatProblems | []>>
    statSuivis: StatSuivis
    setStatSuivis: React.Dispatch<React.SetStateAction<[] | StatSuivis>>
}

type HomeContextProblems = {
    problem: string;
    problemCount: number;
    problems: {
        name: string;
    }
}[] | null

type StatSuivi = {
    suiviCount: number
    month: number
    year: number
}

export type StatSuivis = StatSuivi[]

type StatProblem = {
    id: number
    productCount: number
    year: number
    type: string
    devis: string
    client: string
    chantier: string
    problems: HomeContextProblems
}

const HomeContext = createContext<HomeContextValue | null>(null)

export type StatProblems = StatProblem[]

const HomeProvider = ({ children }: ProviderProps) => {
    const [statTop, setStatTop] = useState<StatProblems | []>([])
    const [statSuivis, setStatSuivis] = useState<StatSuivis | []>([])
    return (
        <HomeContext.Provider value={{ statTop, setStatTop, statSuivis, setStatSuivis }}>
            {children}
        </HomeContext.Provider>
    )
}

export default HomeContext

export { HomeProvider }