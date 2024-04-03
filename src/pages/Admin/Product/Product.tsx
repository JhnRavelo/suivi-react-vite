import { useParams } from "react-router-dom"
import Single from "../../../components/Single/Single"
import useCreateLogs from "../../../hooks/useCreateLogs"
import { useEffect, useState } from "react"
import useProduct from "../../../hooks/useProduct"
import { Product } from "../../../context/ProductContext"
import { dataSingles } from "../../../assets/ts/data"

export type SingleDataKeys = {
    name: string
    color: string
}[]

const dataKeys : SingleDataKeys = [
    {
        name: "total_suivis",
        color: "rebeccapurple"
    },
    {
        name: "suivis_produits",
        color: "greenyellow"
    }
]

const ProductSingle = () => {
    const { id } = useParams()
    const lists = useCreateLogs(id ? id : "")
    const productContext = useProduct()
    const [product, setProduct] = useState<Product | null>(null)

useEffect(()=>{
    if(productContext?.products && id){
        const currentProduct = productContext.products.find(item=>item.id.toString()==id)
        if(currentProduct){
            setProduct(currentProduct)
        }
    }
},[id, productContext?.products])

    return (
        <Single activities={lists} dataKeys={dataKeys} item={product} chartData={dataSingles}/>
    )
}

export default ProductSingle