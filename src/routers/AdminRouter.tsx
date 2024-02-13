import { Route, Routes } from 'react-router-dom'
import Home from '../pages/Admin/Home/Home'
import ProductTypes from '../pages/Admin/ProductTypes/ProductTypes'
import ProductType from '../pages/Admin/ProductType/ProductType'
import Users from '../pages/Admin/Users/Users'
import Products from '../pages/Admin/Products/Products'

const AdminRouter = () => {
  return (
    <Routes>
      <Route element={<Home />} path='/' />
      <Route element={<ProductTypes />} path='/type' />
      <Route element={<ProductType />} path='/type/:id' />
      <Route element={<Users />} path='/user' />
      <Route element={<Products />} path='/product' />
    </Routes>
  )
}

export default AdminRouter
