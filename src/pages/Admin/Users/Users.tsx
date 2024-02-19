import { faUserPlus } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useState } from "react"
import "../ProductTypes/productTypes.scss"
import DataTable, { Colums } from "../../../components/DataTable/DataTable"
import AddForm, { Edit, InitialValues } from "../../../components/Form/Form"
import { validateUser, validateUserUpdate } from "../../../utils/validationSchemas"
import useAxiosPrivate from "../../../hooks/useAxiosPrivate"
import ModalDelete from "../../../components/ModalDelete/ModalDelete"
import useUser from "../../../hooks/useUser"
import { User } from "../../../context/UserContext"
import { isInitialValuesUser } from "../../../utils/verificationType"

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
    const axiosPrivate = useAxiosPrivate()

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

    const handleSubmit = async (value: InitialValues) => {
        if (isInitialValuesUser(value)) {
            try {
                const formData = new FormData()
                if (value.name) {
                    formData.append("name", value.name)
                }
                if (value.password) {
                    formData.append("password", value.password)
                }
                if (value.phone) {
                    formData.append("phone", value.phone.toString())
                }
                if (value.email) {
                    formData.append("email", value.email)
                }
                if (editRow) {
                    formData.append("id", editRow.id.toString())
                    const res = await axiosPrivate.post("/auth/update", formData)
                    if (res.data.success) {
                        userContext?.setUsers(res.data.users)
                        setEditRow(null)
                        setOpen(false)
                    }
                } else {
                    const res = await axiosPrivate.post("/auth/add", formData)
                    if (res.data.success) {
                        userContext?.setUsers(res.data.users)
                        setOpen(false)
                    }
                }
            } catch (error) {
                console.log(error)
            }
        }

    }

    const handleDelete = async () => {
        try {
            const res = await axiosPrivate.delete(`/auth/${deleteRow}`)
            if (res.data.success) {
                userContext?.setUsers(res.data.users)
                setDeleteOpen(false)
                setDeleteRow(null)
            }

        } catch (error) {
            console.log(error)
        }
    }

    function isUser(obj: Edit): obj is User {
        if (obj) {
            return obj && typeof obj === "object" && 'email' in obj;
        }
        return false
    }

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

export default Users

export type { InitialValuesUser }
