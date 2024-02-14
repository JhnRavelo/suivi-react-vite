import { useState } from "react"
import DataTable, { Colums } from "../../../components/DataTable/DataTable"
import ModalDelete from "../../../components/ModalDelete/ModalDelete"
import useSuvi from "../../../hooks/useSuvi"
import { isSuivi } from "../../../utils/verificationType"
import "../ProductTypes/productTypes.scss"
import "./suivis.scss"
import useAxiosPrivate from "../../../hooks/useAxiosPrivate"

const columns: Colums = [
    {
        field: "id",
        type: "string",
        inputMode: "text",
        headerName: "ID",
        placeholder: "Le type de produit",
        width: 40,
        disableExport: false,
    },
    {
        field: "tech",
        type: "string",
        inputMode: "text",
        headerName: "Nom de du technicien",
        placeholder: "Le nom d'utilisateur",
        width: 150,
        disableExport: false,
    },
    {
        field: "type",
        type: "string",
        inputMode: "text",
        headerName: "Type de ménuiserie",
        placeholder: "L'adresse Email",
        width: 150,
        disableExport: false
    },
    {
        field: "client",
        type: "string",
        inputMode: "text",
        headerName: "Nom du client",
        placeholder: "Numéro de télephone",
        width: 120,
        disableExport: false
    },
    {
        field: "devis",
        type: "password",
        inputMode: "password",
        headerName: "Numéro de devis",
        placeholder: "",
        width: 120,
        disableExport: false
    },
    {
        field: "chantier",
        type: "string",
        inputMode: "text",
        headerName: "Nom du chantier",
        placeholder: "Retapez le mot de passe",
        width: 120,
        disableExport: false
    },
    {
        field: "problem",
        type: "string",
        inputMode: "text",
        headerName: "Problème",
        placeholder: "choisir le fichier PDF",
        width: 150,
        disableExport: false
    },
    {
        field: "solution",
        type: "string",
        inputMode: "text",
        headerName: "Solution",
        placeholder: "La date",
        width: 150,
        disableExport: false,
    },
    {
        field: "observation",
        type: "string",
        inputMode: "text",
        headerName: "Observation",
        placeholder: "La date",
        width: 180,
        disableExport: false,
        renderCell: (params) => {
            if (isSuivi(params.row)) {
                const array = params.row.observation.split(";")
                const imgs = array[1].split(",")
                return (
                    <div>
                        <p>{array[0]}</p>
                        <div className="galleryContainer">
                            {imgs.map((gallery, index) => (
                                <img src={gallery} alt="" key={index} className="imgprod" />
                            ))}
                        </div>
                    </div>
                )
            } else {
                return (
                    <p></p>
                )
            }
        }
    },
    {
        field: "createdAt",
        type: "string",
        inputMode: "text",
        headerName: "Date création",
        placeholder: "La date",
        width: 120,
        disableExport: false,
    }
]

const Suivis = () => {
    const suiviContext = useSuvi()
    const axiosPrivate = useAxiosPrivate()
    const [deleteOpen, setDeleteOpen] = useState<boolean>(false)
    const [deleteRow, setDeleteRow] = useState<null | number>(null)

    const handleDelete = async () => {
        try {
            const formData = new FormData()
            if (deleteRow) {
                formData.append("deleteId", deleteRow?.toString())
            }
            const res = await axiosPrivate.post("/suivi/delete", formData)
            if (res.data.success) {
                setDeleteRow(null)
                suiviContext?.setSuivis(res.data.suivis)
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
                    <h1>Liste des suivis</h1>
                </div>
                <DataTable
                    slug="suivi"
                    columns={columns}
                    rows={suiviContext?.suivis}
                    setDeleteOpen={setDeleteOpen}
                    setDeleteRow={setDeleteRow}
                />

                {/* {open && (
        <AddForm
            slug="utilisateur"
            columns={columns}
            setOpen={setOpen}
            editRow={editRow}
            setEditRow={setEditRow}
            initialValues={isUser(editRow) ? { name: editRow?.name, email: editRow.email, phone: editRow.phone } : initialValues}
            validate={editRow ? validateUserUpdate : validateUser}
            handleSubmit={handleSubmit}
        />
    )} */}
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

export default Suivis