import { useContext } from "react"
import HeaderContext from "../context/HeaderContext"

const useHeader = () => {
    return useContext(HeaderContext)
}

export default useHeader