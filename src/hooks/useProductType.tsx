import { useContext } from 'react'
import ProductTypeContext from '../context/ProductTypeContext'

const useProductType = () => {
  return useContext(ProductTypeContext)
}

export default useProductType
