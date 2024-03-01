import { faPlus } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useState } from "react"
import "./productTypes.scss"
import DataTable, { Colums } from "../../../components/DataTable/DataTable"
import useProductType from "../../../hooks/useProductType"
import AddForm, { Edit } from "../../../components/Form/Form"
import { validateType } from "../../../utils/validationSchemas"
import ModalDelete from "../../../components/ModalDelete/ModalDelete"
import { isProductType } from "../../../utils/verificationType"


type InitialValuesType = {
  name?: string
  pdf?: File | null
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
  const [editRow, setEditRow] = useState<Edit>(null)
  const [deleteOpen, setDeleteOpen] = useState(false)
  const [deleteRow, setDeleteRow] = useState<number | null>(null)

  return (
    <>
      <div className="users">
        <div className="info">
          <h1>Liste des types de produit</h1>
          <button className="addButton" onClick={() => setOpen(true)}>
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
            initialValues={isProductType(editRow) && editRow ? { name: editRow.name, pdf: null } : initialValues}
            validate={validateType}
            setState={productTypeContext?.setTypes}
            url="/productType"
            data="types"
            setCheckbox={productTypeContext?.setCheckboxTypes}
          />
        )}
      </div>
      {deleteOpen && (
        <ModalDelete
          setDeleteOpen={setDeleteOpen}
          setDeleteRow={setDeleteRow}
          title="ce type de produit"
          setState={productTypeContext?.setTypes}
          setCheckBox={productTypeContext?.setCheckboxTypes}
          url="/productType"
          data="types"
          deleteRow={deleteRow}
        />
      )}
    </>
  )
}

export default ProductTypes

export type { InitialValuesType }
