import { defaultAxios } from "../api/axios";
import useAuth from "./useAuth";
import { AuthUser } from "../context/AuthContext";

const useRefresh = () => {
    const authContext = useAuth()
    const refresh = async () => {
        try {
            const response = await defaultAxios.get("/refresh");
            console.log("RES", response.data)
            authContext?.setAuth((prev): AuthUser => {
                return {
                    ...prev, role: response.data.role, accessToken: response.data.accessToken, name: prev?.name, email: prev?.email
                }
            })
            return response.data
        }
        catch (error) {
            console.log(error)
        }
    }
    return refresh;
};

export default useRefresh;
