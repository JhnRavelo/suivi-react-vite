import { createContext, useState } from "react"
import { ProviderProps } from "./AuthContext"

type ProductType = {
    id: number
    name?: string
    createdAt: string | undefined
    pdf?: string | undefined
}

type ProductTypes = ProductType[]

type ProductTypeValue = {
    types: ProductTypes | [] | undefined
    setTypes: React.Dispatch<React.SetStateAction<ProductTypes | []>>
    type: ProductType | null
    setType: React.Dispatch<React.SetStateAction<ProductType | null>>
    checkboxTypes: string[] | null
    setCheckboxTypes: React.Dispatch<React.SetStateAction<string[] | null>>
}

const ProductTypeContext = createContext<ProductTypeValue | null>(null)

const ProductTypeProvider = ({ children }: ProviderProps) => {
    const [types, setTypes] = useState<[] | ProductTypes>([])
    const [type, setType] = useState<ProductType | null>(null)
    const [checkboxTypes, setCheckboxTypes] = useState<string[] | null>(null)
    return (
        <ProductTypeContext.Provider value={{
            types,
            setTypes,
            type,
            setType,
            checkboxTypes,
            setCheckboxTypes
        }}>
            {children}
        </ProductTypeContext.Provider>
    )
}

export default ProductTypeContext

export { ProductTypeProvider }

export type { ProductTypes, ProductType }
