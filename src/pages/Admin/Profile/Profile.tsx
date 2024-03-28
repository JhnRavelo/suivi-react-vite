import "./profile.scss"
import faEdit from "../../../assets/svg/editer.svg"
import faSignOutAlt from "../../../assets/svg/se-deconnecter.svg"
import { useState } from "react"
import FormAdd from "../../../components/Form/Form"
import useAuth from "../../../hooks/useAuth"
import faAvatar from "../../../assets/png/reglages.png"
import useLogout from "../../../hooks/useLogout"

const Profile = () => {
    const [open, setOpen] = useState(false)
    const logout = useLogout()
    const authContext = useAuth()
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
                    <img src={faSignOutAlt} className="icon-flip"/>
                    Se déconnecter
                </button>
            </div>
            {/* {open && (
        <FormAdd
          slug="profile"
          columns={columns}
          setOpen={setOpen}
          editRow={auth}
          url="/auth/User"
        />
      )} */}
        </>
    )
}

export default Profile
