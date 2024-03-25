import { createContext, useState } from "react";
import { ProviderProps } from "./AuthContext";

type HeaderContextValue = {
  years: string[];
  setYears: React.Dispatch<React.SetStateAction<string[]>>;
  year: NbrStrUn;
  setYear: React.Dispatch<React.SetStateAction<NbrStrUn>>;
  notifs: string[];
  setNotifs: React.Dispatch<React.SetStateAction<string[]>>;
  isImport: boolean;
  setIsImport: StateBool;
};

export type StateBool = React.Dispatch<React.SetStateAction<boolean>>;

export type NbrStrUn = number | string | undefined;

const HeaderContext = createContext<null | HeaderContextValue>(null);

const HeaderProvider = ({ children }: ProviderProps) => {
  const [years, setYears] = useState<Array<string>>([]);
  const [year, setYear] = useState<NbrStrUn>();
  const [notifs, setNotifs] = useState<string[]>([]);
  const [isImport, setIsImport] = useState<boolean>(false);
  return (
    <HeaderContext.Provider
      value={{
        years,
        setYear,
        year,
        setYears,
        notifs,
        setNotifs,
        isImport,
        setIsImport,
      }}
    >
      {children}
    </HeaderContext.Provider>
  );
};

export default HeaderContext;

export { HeaderProvider };
