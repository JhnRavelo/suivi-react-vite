import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import "./index.scss"
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext.tsx'
import { HeaderProvider } from './context/HeaderContext.tsx'
import { ProductTypeProvider } from './context/ProductTypeContext.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
    <BrowserRouter>
        <HeaderProvider>
            <AuthProvider>
                <ProductTypeProvider>
                    <App />
                </ProductTypeProvider>
            </AuthProvider>
        </HeaderProvider>
    </BrowserRouter>
)
