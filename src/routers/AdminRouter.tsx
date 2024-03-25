import { Route, Routes } from 'react-router-dom'
import Home from '../pages/Admin/Home/Home'
import ProductTypes from '../pages/Admin/ProductTypes/ProductTypes'
import ProductType from '../pages/Admin/ProductType/ProductType'
import Users from '../pages/Admin/Users/Users'
import Products from '../pages/Admin/Products/Products'
import Suivis from '../pages/Admin/Suivis/Suivis'
import Problems from '../pages/Admin/Problems/Problems'
import Log from '../pages/Admin/Logs/Logs'
import Saves from '../pages/Admin/Saves/Saves'

const AdminRouter = () => {
  return (
    <Routes>
      <Route element={<Home />} path='/' />
      <Route element={<ProductTypes />} path='/type' />
      <Route element={<ProductType />} path='/type/:id' />
      <Route element={<Problems />} path='/problem/:id' />
      <Route element={<Users />} path='/user' />
      <Route element={<Products />} path='/product' />
      <Route element={<Suivis />} path='/suivi' />
      <Route element={<Log />} path='/log' />
      <Route element={<Saves />} path='/save' />
    </Routes>
  )
}

export default AdminRouter
