import { useContext } from 'react'
import SuiviContext from '../context/SuiviContext'

const useSuvi = () => {
  return useContext(SuiviContext)
}

export default useSuvi