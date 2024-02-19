import { useContext } from "react"
import ProblemContext from "../context/ProblemContext"

const useProblem = ()=>{
    return useContext(ProblemContext)
}

export default useProblem