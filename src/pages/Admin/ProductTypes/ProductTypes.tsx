import { faPlus } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useState } from "react"
import "./productTypes.scss"
import DataTable, { Colums } from "../../../components/DataTable/DataTable"
import useProductType from "../../../hooks/useProductType"
import AddForm from "../../../components/Form/Form"
import { ProductType } from "../../../context/ProductTypeContext"
import { validateType } from "../../../utils/validationSchemas"
import useAxiosPrivate from "../../../hooks/useAxiosPrivate"
import ModalDelete from "../../../components/ModalDelete/ModalDelete"

type InitialValuesType = {
  name: string
  pdf: File | null
}

const columns: Colums = [
  {
    field: "id",
    type: "string",
    inputMode: "text",
    headerName: "ID",
    placeholder: "Le type de produit",
    width: 40,
    disableExport: true,
  },
  {
    field: "name",
    type: "string",
    inputMode: "text",
    headerName: "Type de produit",
    placeholder: "Le type de produit",
    width: 210,
    disableExport: true,
  },
  {
    field: "createdAt",
    type: "string",
    inputMode: "text",
    headerName: "Date de création",
    placeholder: "La date",
    width: 230,
    disableExport: true,
  },
  {
    field: "pdf",
    type: "file",
    inputMode: "text",
    headerName: "Fichier PDF",
    placeholder: "choisir le fichier PDF",
    width: 120,
    disableExport: true
  }

]

const initialValues: InitialValuesType = {
  name: "",
  pdf: null

}

const ProductTypes = () => {
  const [open, setOpen] = useState(false)
  const productTypeContext = useProductType()
  const [editRow, setEditRow] = useState<ProductType | null>(null)
  const [deleteOpen, setDeleteOpen] = useState(false)
  const [deleteRow, setDeleteRow] = useState<number | null>()
  const axiosPrivate = useAxiosPrivate()

  const handleSubmit = async (value: InitialValuesType) => {
    const formData = new FormData()
    formData.append("name", value.name)
    if (value.pdf) {
      formData.append("pdf", value.pdf)
    }
    try {
      const res = await axiosPrivate.post("/productType/add", formData)
      if (res.data.success) {
        productTypeContext?.setTypes(res.data.types)
        setOpen(false)
      }
    } catch (error) {
      console.log(error)
    }

  }

  const handleDelete = async () => {
    try {
      const res = await axiosPrivate.delete(`/productType/${deleteRow}`)
      if (res.data.success) {
        productTypeContext?.setTypes(res.data.types)
        setDeleteOpen(false)
      }

    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <div className="users">
        <div className="info">
          <h1>Type de produits</h1>
          <button onClick={() => setOpen(true)}>
            <FontAwesomeIcon icon={faPlus} beat />
            Ajout de type
          </button>
        </div>
        <DataTable
          slug="type"
          columns={columns}
          rows={productTypeContext?.types}
          setOpen={setOpen}
          setEditRow={setEditRow}
          setDeleteOpen={setDeleteOpen}
          setDeleteRow={setDeleteRow}
        />

        {open && (
          <AddForm
            slug="type"
            columns={columns}
            setOpen={setOpen}
            editRow={editRow}
            setEditRow={setEditRow}
            initialValues={initialValues}
            validate={validateType}
            handleSubmit={handleSubmit}
          />
        )}
      </div>
      {deleteOpen && (
        <ModalDelete
          setDeleteOpen={setDeleteOpen}
          setDeleteRow={setDeleteRow}
          title="cet utilisateur"
          handleDelete={handleDelete}
        />
      )}
    </>
  )
}

export default ProductTypes

export type { InitialValuesType }