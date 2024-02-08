import { defaultAxios } from "../api/axios";
import useAuth from "./useAuth";

const useRefresh = () => {
    const authContext = useAuth()
    const refresh = async () => {
        try {
            const response = await defaultAxios.get("/refresh");
            authContext?.setAuth(
                {role: response.data.role, 
                accessToken: response.data.accessToken, 
                name: response.data.name, 
                email: response.data.email}
            )
            return response.data
        }
        catch (error) {
            console.log(error)
        }
    }
    return refresh;
};

export default useRefresh;
