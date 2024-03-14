import { useContext } from 'react'
import HomeContext from '../context/HomeContext'

const useHome = () => {
  return useContext(HomeContext)
}

export default useHome