import { Route, Routes } from 'react-router-dom'
import Home from '../pages/Admin/Home/Home'
import ProductTypes from '../pages/Admin/ProductTypes/ProductTypes'

const AdminRouter = () => {
  return (
    <Routes>
        <Route element={<Home/>} path='/'/>
        <Route element={<ProductTypes/>} path='/type'/>
    </Routes>
  )
}

export default AdminRouter
