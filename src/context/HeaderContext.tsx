import { createContext, useState } from "react";
import { ProviderProps } from "./AuthContext";

type HeaderContextValue = {
    years: string[]
    setYears: React.Dispatch<React.SetStateAction<string[]>>
    year: string | number
    setYear: React.Dispatch<React.SetStateAction<number | string>>
    notifs: string[]
    setNotifs: React.Dispatch<React.SetStateAction<string[]>>
}

const HeaderContext = createContext<null | HeaderContextValue>(null)

const HeaderProvider = ({ children }: ProviderProps) => {
    const [years, setYears] = useState<Array<string>>([])
    const [year, setYear] = useState<number | string>(() => {
        const date = new Date();
        const year = date.getFullYear();
        return year;
    })
    const [notifs, setNotifs] = useState<string[]>([])
    return (
        <HeaderContext.Provider value={{ years, setYear, year, setYears, notifs, setNotifs }}>
            {children}
        </HeaderContext.Provider>
    )
}

export default HeaderContext

export { HeaderProvider }