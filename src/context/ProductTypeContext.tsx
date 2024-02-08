import { createContext, useState } from "react"
import { ProviderProps } from "./AuthContext"

type ProductType = {
        id: number
        name: string
        createdAt: string
        pdf: string
    }


type ProductTypes = ProductType[] 

type ProductTypeValue = {
    types: ProductTypes | [] | undefined
    setTypes: React.Dispatch<React.SetStateAction<ProductTypes | []>>
}

const ProductTypeContext = createContext<ProductTypeValue | null>(null)

const ProductTypeProvider = ({children}:ProviderProps)=>{
    const [types, setTypes] = useState<[] | ProductTypes>([])
    return (
        <ProductTypeContext.Provider value={{types, setTypes}}>
            {children}
        </ProductTypeContext.Provider>
    )
}

export default ProductTypeContext

export {ProductTypeProvider}

export type {ProductTypes, ProductType}
