import { useContext } from 'react'
import LogContext from '../context/LogContext'

const useLog = () => {
  return useContext(LogContext)
}

export default useLog
