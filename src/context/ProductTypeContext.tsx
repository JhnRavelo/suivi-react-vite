import { createContext, useState } from "react"
import { ProviderProps } from "./AuthContext"
import { CheckBox } from "../components/Form/Form"

export type ProductType = {
    id: number
    name?: string
    createdAt: string
    pdf?: string 
}

export type ProductTypes = ProductType[]

type ProductTypeValue = {
    types: ProductTypes
    setTypes: React.Dispatch<React.SetStateAction<ProductTypes>>
    type: ProductType | null
    setType: React.Dispatch<React.SetStateAction<ProductType | null>>
    checkboxTypes: string[] | null
    setCheckboxTypes: CheckBox
}

const ProductTypeContext = createContext<ProductTypeValue | null>(null)

const ProductTypeProvider = ({ children }: ProviderProps) => {
    const [types, setTypes] = useState<ProductTypes>([])
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

