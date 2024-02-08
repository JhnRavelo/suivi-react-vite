import { useNavigate } from "react-router-dom"
import useAuth from "./useAuth"
import useAxiosPrivate from "./useAxiosPrivate"
import useHeader from "./useHeader"

const useLogout = () => {
    const axiosPrivate = useAxiosPrivate()
    const authContext = useAuth()
    const headerContext = useHeader()
    const navigate = useNavigate()
 const logout = async ()=>{
    try {
        const res = await axiosPrivate.get("/auth/logout-web")
        if(!res.data.success) {
            document.cookie = `jwt_ea_suivi=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
        } 
        authContext?.setAuth(null)
        headerContext?.setNotifs([])
        navigate("/")
    } catch (error) {
        console.log(error)
    }
 }

 return logout
}

export default useLogout
