import { createContext, useState } from "react";
import { ProviderProps } from "./AuthContext";

type HomeContextValue = {
    statTop: StatTops
    setStatTop: React.Dispatch<React.SetStateAction<StatTops>>
    statSuivis: StatSuivis
    setStatSuivis: React.Dispatch<React.SetStateAction<StatSuivis>>
    statProductTypes: StatProductTypes
    setStatProductTypes: React.Dispatch<React.SetStateAction<StatProductTypes>>
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

type StatTop = {
    id: number
    productCount: number
    year: number
    type: string
    devis: string
    client: string
    chantier: string
    problems: HomeContextProblems
}

export type StatProductType = {
    year: number
    count: number
    name: string
}

export type StatProductTypes = StatProductType[]
export type StatTops = StatTop[]

const HomeContext = createContext<HomeContextValue | null>(null)

const HomeProvider = ({ children }: ProviderProps) => {
    const [statTop, setStatTop] = useState<StatTops>([])
    const [statSuivis, setStatSuivis] = useState<StatSuivis>([])
    const [statProductTypes, setStatProductTypes] = useState<StatProductTypes>([])
    return (
        <HomeContext.Provider value={{ statTop, setStatTop, statSuivis, setStatSuivis, statProductTypes, setStatProductTypes }}>
            {children}
        </HomeContext.Provider>
    )
}

export default HomeContext

export { HomeProvider }