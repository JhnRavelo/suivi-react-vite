import "./profile.scss"
import faEdit from "../../../assets/svg/editer.svg"
import faSignOutAlt from "../../../assets/svg/se-deconnecter.svg"
import { useState } from "react"
import FormAdd from "../../../components/Form/Form"
import useAuth from "../../../hooks/useAuth"
import faAvatar from "../../../assets/png/reglages.png"
import useLogout from "../../../hooks/useLogout"
import { Colums } from "../../../components/DataTable/DataTable"
import { validationProfile } from "../../../utils/validationSchemas"

export type InitialValuesProfile = {
    name: string;
    avatar: File | null;
    password: string;
    confirmPassword: string;
}

const columns: Colums = [
    {
        field: "name",
        type: "string",
        inputMode: "text",
        headerName: "Nom de l'administrateur",
        placeholder: "nom de l'administrateur",
        width: 40,
        disableExport: true,
    },
    {
        field: "avatar",
        type: "file",
        inputMode: "file",
        headerName: "Image profile",
        placeholder: "Image de profile",
        width: 40,
        disableExport: true,
    },
    {
        field: "password",
        type: "password",
        inputMode: "password",
        headerName: "Mot de passe",
        placeholder: "Ne changera pas si vide",
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
]

const Profile = () => {
    const [open, setOpen] = useState(false)
    const logout = useLogout()
    const authContext = useAuth()
    const initialValues : InitialValuesProfile = {
        name: authContext?.auth?.name ? authContext?.auth?.name : "",
        avatar: null,
        password: "",
        confirmPassword: "",
    }
    return (
        <>
            <div id="profile">
                <h1>Profile</h1>
                <div className="edit__admin">
                    <h2>Modifier votre profile</h2>
                    <button className="edit__profile" onClick={() => setOpen(true)}>
                        <img src={faEdit} alt="edit image" className="icon-beat" />
                        éditer
                    </button>
                </div>
                <div className="admin__card">
                    <div className="admin__img">
                        <img src={authContext?.auth?.avatar ? authContext?.auth?.avatar : faAvatar} alt="image profile" />
                    </div>
                    <div className="info__admin">
                        <h1 className="admin__name">{authContext?.auth?.name}</h1>
                        <h2 className="admin__email">{authContext?.auth?.email}</h2>
                        <h1 className="user__admin">- Administrateur</h1>
                    </div>
                </div>
                <button className="logout__button" onClick={() => logout()}>
                    <img src={faSignOutAlt} className="icon-flip" />
                    Se déconnecter
                </button>
            </div>
            {open && (
                <FormAdd
                    slug="profile"
                    columns={columns}
                    setOpen={setOpen}
                    initialValues={initialValues}
                    validate={validationProfile}
                    setState={authContext?.setAuth}
                    data="user"
                    url="/auth/profile"
                />
            )}
        </>
    )
}

export default Profile
