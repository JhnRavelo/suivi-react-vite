import { Route, Routes } from "react-router-dom"
import Login from "../pages/Login/Login"
import PersistantLogin from "../components/Private/PersistantLogin"
import PrivateRoutes from "../components/Private/PrivateRouter"
import Home from "../pages/Home/Home"

const prime = import.meta.env.VITE_PRIME

const AppRouter = () => {
    return (
        <Routes>
            <Route element={<Login />} path="/" />
            <Route element={<PersistantLogin />}>
                <Route element={<PrivateRoutes prime={prime} />} >
                    <Route element={<Home />} path="/home" />
                </Route>
            </Route>
        </Routes>
    )
}

export default AppRouter