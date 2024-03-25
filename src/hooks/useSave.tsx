import { useContext } from 'react'
import SaveContext from '../context/SaveContext'

const useSave = () => {
  return useContext(SaveContext)
}

export default useSave