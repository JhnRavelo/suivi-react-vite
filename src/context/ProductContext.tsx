import { createContext, useState } from "react";
import { ProviderProps } from "./AuthContext";

type ProductValue = {
    products: Products | []
    setProducts: React.Dispatch<React.SetStateAction<Products | []>>
}

type Product = {
    id: number
    type?: string
    location?: string
    devis?: string
    detail?: string
    dimension?: string
    client?: string
    chantier?: string
    productTypeId?: number
    createdAt: string
    tech?: string
}

type Products = Product[]

const ProductContext = createContext<ProductValue | null>(null)

const ProductProvider = ({children}: ProviderProps) => {
    const [products, setProducts] = useState<[] | Products>([])
    return (
        <ProductContext.Provider value={{products, setProducts}} >
            {children}
        </ProductContext.Provider>
    )
}

export default ProductContext

export {ProductProvider}

export type {Product, Products}