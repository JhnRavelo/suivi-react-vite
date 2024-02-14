import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import "./index.scss"
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext.tsx'
import { HeaderProvider } from './context/HeaderContext.tsx'
import { ProductTypeProvider } from './context/ProductTypeContext.tsx'
import { UserProvider } from './context/UserContext.tsx'
import { ProductProvider } from './context/ProductContext.tsx'
import { SuiviProvider } from './context/SuiviContext.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
    <BrowserRouter>
        <HeaderProvider>
            <AuthProvider>
                <ProductTypeProvider>
                    <UserProvider>
                        <ProductProvider>
                            <SuiviProvider>
                                <App />
                            </SuiviProvider>
                        </ProductProvider>
                    </UserProvider>
                </ProductTypeProvider>
            </AuthProvider>
        </HeaderProvider>
    </BrowserRouter>
)
