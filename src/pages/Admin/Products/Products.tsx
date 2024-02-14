import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import DataTable, { Colums } from "../../../components/DataTable/DataTable"
import "../ProductTypes/productTypes.scss"
import { faPlus } from "@fortawesome/free-solid-svg-icons"
import AddForm, { Edit, InitialValues } from "../../../components/Form/Form"
import ModalDelete from "../../../components/ModalDelete/ModalDelete"
import { useState } from "react"
import useProduct from "../../../hooks/useProduct"
import useAxiosPrivate from "../../../hooks/useAxiosPrivate"
import { validateProduct } from "../../../utils/validationSchemas"
import { isInitialValuesProduct, isProduct } from "../../../utils/verificationType"
import useProductType from "../../../hooks/useProductType"
import useUser from "../../../hooks/useUser"
import PrintQR from "../../../components/PrintQR/PrintQR"

export type initialValuesProduct = {
    type?: string[] | null
    devis?: string | null
    detail?: string | null
    dimension?: string | null
    client?: string | null
    chantier?: string | null
    location?: string | null
    tech?: string[] | null
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
        field: "type",
        type: "string",
        inputMode: "text",
        headerName: "Type de ménuiserie",
        placeholder: "Le type de ménuiserie",
        width: 150,
        disableExport: false,
    },
    {
        field: "dimension",
        type: "string",
        inputMode: "text",
        headerName: "Hauteur*Largeur",
        placeholder: "Hauteur*Largeur",
        width: 120,
        disableExport: false
    },
    {
        field: "devis",
        type: "string",
        inputMode: "text",
        headerName: "Numéro de dévis",
        placeholder: "Numéro de dévis",
        width: 150,
        disableExport: false
    },
    {
        field: "tech",
        type: "string",
        inputMode: "text",
        headerName: "Nom du technicien",
        placeholder: "Le nom du technicien",
        width: 150,
        disableExport: false
    },
    {
        field: "client",
        type: "string",
        inputMode: "text",
        headerName: "Nom du client",
        placeholder: "Le nom du client",
        width: 120,
        disableExport: false
    },
    {
        field: "chantier",
        type: "string",
        inputMode: "text",
        headerName: "Nom du chantier",
        placeholder: "Le nom du chantier",
        width: 120,
        disableExport: false
    },
    {
        field: "detail",
        type: "string",
        inputMode: "text",
        headerName: "Détails",
        placeholder: "Certain détails du produit",
        width: 120,
        disableExport: true
    },
    {
        field: "location",
        type: "string",
        inputMode: "text",
        headerName: "Emplacement",
        placeholder: "Emplacement du produit",
        width: 200,
        disableExport: true
    },
    {
        field: "createdAt",
        type: "string",
        inputMode: "text",
        headerName: "Date de création",
        placeholder: "La date",
        width: 120,
        disableExport: false,
    },
]

const initialValues: initialValuesProduct = {
    type: null,
    devis: null,
    dimension: null,
    client: null,
    chantier: null,
    detail: null,
    location: null,
    tech: null
}

const Products = () => {
    const [open, setOpen] = useState(false)
    const productContext = useProduct()
    const [editRow, setEditRow] = useState<Edit>(null)
    const [deleteOpen, setDeleteOpen] = useState(false)
    const [deleteRow, setDeleteRow] = useState<number | null>(null)
    const [printOpen, setPrintOpen] = useState(false)
    const axiosPrivate = useAxiosPrivate()
    const productTypeContext = useProductType()
    const userContext = useUser()

    const handleDelete = async () => {
        try {
            const res = await axiosPrivate.delete(`/product/${deleteRow}`)
            if (res.data.success) {
                productContext?.setProducts(res.data.products)
                setDeleteOpen(false)
                setDeleteRow(null)
            }
        } catch (error) {
            console.log(error)
        }
    }

    const handleSubmit = async (value: InitialValues) => {
        if (isInitialValuesProduct(value)) {
            try {
                const formData = new FormData()
                if (value.tech) {
                    const compareTech = value.tech[0]
                    const tech = userContext?.users?.filter((item) => item.name == compareTech)[0].id
                    if (tech) {
                        formData.append("tech", tech?.toString())
                    }
                }
                if (value.type) {
                    const compareType = value.type[0]
                    const type = productTypeContext?.types?.filter(item => item.name == compareType)[0].id
                    if (type) {
                        formData.append("type", type.toString())
                    }

                }
                formData.append("dimension", `${value.dimension}`)
                formData.append("location", `${value.location}`)
                formData.append("client", `${value.client}`)
                formData.append("detail", `${value.detail}`)
                formData.append("chantier", `${value.chantier}`)
                formData.append("devis", `${value.devis}`)
                if (editRow) {
                    formData.append("id", editRow.id.toString())
                    const res = await axiosPrivate.put("/product", formData)
                    if (res.data.success) {
                        productContext?.setProducts(res.data.products)
                        setEditRow(null)
                        setOpen(false)
                    }
                } else {
                    const res = await axiosPrivate.post("/product", formData)
                    if (res.data.success) {
                        productContext?.setProducts(res.data.products)
                        setOpen(false)
                    }
                }
            } catch (error) {
                console.log(error)
            }
        }
    }

    return (
        <>
            <div className="users">
                <div className="info">
                    <h1>Liste des produits</h1>
                    <button onClick={() => setOpen(true)}>
                        <FontAwesomeIcon icon={faPlus} beat />
                        Ajout de produit
                    </button>
                </div>
                <DataTable
                    slug="product"
                    columns={columns}
                    rows={productContext?.products}
                    setOpen={setOpen}
                    setEditRow={setEditRow}
                    setDeleteOpen={setDeleteOpen}
                    setDeleteRow={setDeleteRow}
                    setPrintOpen={setPrintOpen}
                />

                {open && (
                    <AddForm
                        slug="produit"
                        columns={columns}
                        setOpen={setOpen}
                        editRow={editRow}
                        setEditRow={setEditRow}
                        initialValues={isProduct(editRow) ?
                            {
                                type: [`${editRow.type && editRow.type}`],
                                devis: editRow.devis,
                                dimension: editRow.dimension,
                                client: editRow.client,
                                chantier: editRow.chantier,
                                detail: editRow.detail,
                                location: editRow.location,
                                tech: [`${editRow.tech && editRow.tech}`],
                            } : initialValues
                        }
                        validate={validateProduct}
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
            {printOpen &&
                <PrintQR
                    setPrintOpen={setPrintOpen}
                    editRow={editRow}
                    setEditRow={setEditRow}
                />
            }
        </>
    )
}


export default Products
