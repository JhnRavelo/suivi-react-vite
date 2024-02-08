import { useEffect } from "react"
import Header from "../../components/Header/Header"
import useAxiosPrivate from "../../hooks/useAxiosPrivate"
import useHeader from "../../hooks/useHeader"
import "./index.scss"
import Menu from "../../components/Menu/Menu"
import AdminRouter from "../../routers/AdminRouter"
import useProductType from "../../hooks/useProductType"

const Admin = () => {
  const axiosPrivate = useAxiosPrivate()
  const headerContext = useHeader()
  const productTypeContext = useProductType()

  useEffect(() => {
    fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const fetchData = async () => {
    try {
      const fetchLogs = await axiosPrivate.get("/log")
      if (fetchLogs.data.success) {
        headerContext?.setNotifs(fetchLogs.data.logs)
      }
      const fetchProductTypes = await axiosPrivate.get("/productType/getAll")
      if (fetchProductTypes.data.success) {
        productTypeContext?.setTypes(fetchProductTypes.data.productTypes)
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="main">
      <Header />
      <div className="containerAdmin">
        <div className="menuContainer">
          <Menu />
        </div>
        <div className="contentContainer">
          <AdminRouter />
        </div>
      </div>
    </div>
  )
}

export default Admin
