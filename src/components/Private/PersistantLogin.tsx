import { useEffect, useState } from "react";
import useRefresh from "../../hooks/useRefresh";
import useAuth from "../../hooks/useAuth";
import { Outlet } from "react-router-dom";

const PersistantLogin = () => {
    const [isLoading, setIsLoading] = useState(true);
    const refresh = useRefresh();
    const authContext = useAuth();

    useEffect(() => {
        let isMounted = true;
        console.log(authContext)
        const verifyRefreshToken = async () => {
            try {
                await refresh();
            } catch (error) {
                console.log(error);
            } finally {
                isMounted && setIsLoading(false);
            }
        };
        !authContext?.auth?.accessToken ? verifyRefreshToken() : setIsLoading(false);

        return (): void => {
            isMounted = false;
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return <>{isLoading ? <p>Loading...</p> : <Outlet />}</>;
};

export default PersistantLogin;
