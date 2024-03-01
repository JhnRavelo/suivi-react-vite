import { faUserPlus } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useState } from "react"
import "../ProductTypes/productTypes.scss"
import DataTable, { Colums } from "../../../components/DataTable/DataTable"
import AddForm, { Edit } from "../../../components/Form/Form"
import { validateUser, validateUserUpdate } from "../../../utils/validationSchemas"
import ModalDelete from "../../../components/ModalDelete/ModalDelete"
import useUser from "../../../hooks/useUser"
import { isUser } from "../../../utils/verificationType"

type InitialValuesUser = {
    name?: string
    email?: string
    phone?: number | null
    password?: string | null
    confirmPassword?: string | null
}

const initialValues: InitialValuesUser = {
    name: "",
    email: "",
    password: null,
    phone: null,
    confirmPassword: null
}

const Users = () => {
    const [open, setOpen] = useState(false)
    const userContext = useUser()
    const [editRow, setEditRow] = useState<Edit>(null)
    const [deleteOpen, setDeleteOpen] = useState(false)
    const [deleteRow, setDeleteRow] = useState<number | null>(null)

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
            headerName: "Nom de l'utilisateur",
            placeholder: "Le nom d'utilisateur",
            width: 150,
            disableExport: false,
        },
        {
            field: "email",
            type: "string",
            inputMode: "text",
            headerName: "Email",
            placeholder: "L'adresse Email",
            width: 180,
            disableExport: false
        },
        {
            field: "phone",
            type: "string",
            inputMode: "text",
            headerName: "Numéro de télephone",
            placeholder: "Numéro de télephone",
            width: 150,
            disableExport: false
        },
        {
            field: "password",
            type: "password",
            inputMode: "password",
            headerName: "Mot de passe",
            placeholder: `${editRow ? "Ne changera pas si vide" : "Le mot de passe"}`,
            width: 120,
            disableExport: true
        },
        {
            field: "confirmPassword",
            type: "password",
            inputMode: "password",
            headerName: "Confirmation mot de passe",
            placeholder: "Retapez le mot de passe",
            width: 120,
            disableExport: true
        },
        {
            field: "connected",
            type: "boolean",
            inputMode: "text",
            headerName: "Connecté",
            placeholder: "choisir le fichier PDF",
            width: 120,
            disableExport: true
        },
        {
            field: "createdAt",
            type: "string",
            inputMode: "text",
            headerName: "Date de création",
            placeholder: "La date",
            width: 180,
            disableExport: false,
        },
    ]

    return (
        <>
            <div className="users">
                <div className="info">
                    <h1>Liste des utilisateurs</h1>
                    <button className="addButton" onClick={() => setOpen(true)}>
                        <FontAwesomeIcon icon={faUserPlus} beat />
                        Ajout d'utilisateur
                    </button>
                </div>
                <DataTable
                    slug="user"
                    columns={columns}
                    rows={userContext?.users}
                    setOpen={setOpen}
                    setEditRow={setEditRow}
                    setDeleteOpen={setDeleteOpen}
                    setDeleteRow={setDeleteRow}
                />

                {open && (
                    <AddForm
                        slug="utilisateur"
                        columns={columns}
                        setOpen={setOpen}
                        editRow={editRow}
                        setEditRow={setEditRow}
                        initialValues={isUser(editRow) ? { name: editRow?.name, email: editRow.email, phone: editRow.phone } : initialValues}
                        validate={editRow ? validateUserUpdate : validateUser}
                        data={"users"}
                        url="/auth/user"
                        setState={userContext?.setUsers}
                        setCheckbox={userContext?.setCheckboxUser}
                    />
                )}
            </div>
            {deleteOpen && (
                <ModalDelete
                    setDeleteOpen={setDeleteOpen}
                    setDeleteRow={setDeleteRow}
                    title="cet utilisateur"
                    deleteRow={deleteRow}
                    data="users"
                    setState={userContext?.setUsers}
                    setCheckBox={userContext?.setCheckboxUser}
                    url="/auth/user"
                />
            )}
        </>
    )
}

export default Users

export type { InitialValuesUser }
