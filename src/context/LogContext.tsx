import { createContext, useState } from "react";
import { ProviderProps } from "./AuthContext";

export type Logs = {
    year: number
    log: string
    createdAt: string
    problem: string
    solution: string
}[]

type LogContextValue = {
    logs: Logs
    setLogs: React.Dispatch<React.SetStateAction<Logs>>
}

const LogContext = createContext<LogContextValue | null>(null)

const LogProvider = ({ children }: ProviderProps) => {
    const [logs, setLogs] = useState<Logs>([])
    return (
        <LogContext.Provider value={{ logs, setLogs }}>
            {children}
        </LogContext.Provider>
    )
}

export { LogProvider }

export default LogContext

