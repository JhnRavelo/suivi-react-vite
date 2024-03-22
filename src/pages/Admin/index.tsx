/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react"
import Header from "../../components/Header/Header"
import useAxiosPrivate from "../../hooks/useAxiosPrivate"
import useHeader from "../../hooks/useHeader"
import "./index.scss"
import Menu from "../../components/Menu/Menu"
import AdminRouter from "../../routers/AdminRouter"
import useProductType from "../../hooks/useProductType"
import useUser from "../../hooks/useUser"
import useProduct from "../../hooks/useProduct"
import { ProductType } from "../../context/ProductTypeContext"
import { User } from "../../context/UserContext"
import useSuvi from "../../hooks/useSuvi"
import useProblem from "../../hooks/useProblem"
import useHome from "../../hooks/useHome"
import useLog from "../../hooks/useLog"

const Admin = () => {
  const axiosPrivate = useAxiosPrivate()
  const headerContext = useHeader()
  const productTypeContext = useProductType()
  const userContext = useUser()
  const productContext = useProduct()
  const suiviContext = useSuvi()
  const problemContext = useProblem()
  const homeContext = useHome()
  const logContext = useLog()

  useEffect(() => {
    fetchData()
  }, [headerContext?.isImport])

  const fetchData = async () => {
    try {
      const fetchLogs = await axiosPrivate.get("/log")
      if (fetchLogs.data.success) {
        headerContext?.setNotifs(fetchLogs.data.logs)
        logContext?.setLogs(fetchLogs.data.allLogs)
      }
      const fetchProductTypes = await axiosPrivate.get("/productType/getAll")
      if (fetchProductTypes.data.success) {
        productTypeContext?.setTypes(fetchProductTypes.data.productTypes)
        const checkboxTypes = fetchProductTypes.data.productTypes.map((item: ProductType) => {
          return item.name
        })
        productTypeContext?.setCheckboxTypes(checkboxTypes)
      }
      const fetchUsers = await axiosPrivate.get("/auth/getAll")
      if (fetchUsers.data.success) {
        userContext?.setUsers(fetchUsers.data.users)
        const checkboxUsers = fetchUsers.data.users.map((item: User) => {
          return item.name
        })
        userContext?.setCheckboxUser(checkboxUsers)
      }
      const fetchProducts = await axiosPrivate.get("/product/getAll")
      if (fetchProducts.data.success) {
        productContext?.setProducts(fetchProducts.data.products)
      }
      const fetchSuivis = await axiosPrivate.get("/suivi/getAll")
      if (fetchSuivis.data.success) {
        suiviContext?.setSuivis(fetchSuivis.data.suivis)
        headerContext?.setYears(fetchSuivis.data.years)
        headerContext?.setYear(fetchSuivis.data.years[fetchSuivis.data.years.length - 1])
      }
      const fetchProblems = await axiosPrivate.get("/problem/getAll")
      if (fetchProblems.data.success) {
        problemContext?.setProblems(fetchProblems.data.problems)
      }
      const stat = await axiosPrivate.get("/suivi/getStat")
      if (stat.data.success) {
        problemContext?.setStatProblems(stat.data.statProblems)
        homeContext?.setStatTop(stat.data.statTop)
        homeContext?.setStatSuivis(stat.data.statSuivis)
        homeContext?.setStatProductTypes(stat.data.statProductTypes)
      }
    } catch (error) {
      console.log("ERROR FETCHDATA INDEX ADMIN", error)
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
