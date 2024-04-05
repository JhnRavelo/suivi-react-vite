import { createContext, useState } from "react";
import { ProviderProps } from "./AuthContext";

export type Problems = Problem[];

export type Problem = {
  id: number;
  name: string;
  productTypeId: number;
};

type StatProblem = {
  count: number;
  name: string;
  year: number;
  id: number;
  productTypeId: number;
};

export type StatProblems = StatProblem[];

type ProblemValue = {
  problems: Problems;
  setProblems: React.Dispatch<React.SetStateAction<Problems>>;
  problemsByType: Problems;
  setProblemsByType: React.Dispatch<React.SetStateAction<Problems>>;
  statProblems: StatProblems;
  setStatProblems: React.Dispatch<React.SetStateAction<StatProblems>>;
};

const ProblemContext = createContext<ProblemValue | null>(null);

const ProblemProvider = ({ children }: ProviderProps) => {
  const [problems, setProblems] = useState<Problems>([]);
  const [problemsByType, setProblemsByType] = useState<Problems>([]);
  const [statProblems, setStatProblems] = useState<StatProblems>([]);
  return (
    <ProblemContext.Provider
      value={{
        problems,
        setProblems,
        problemsByType,
        setProblemsByType,
        statProblems,
        setStatProblems,
      }}
    >
      {children}
    </ProblemContext.Provider>
  );
};

export default ProblemContext;

export { ProblemProvider };
