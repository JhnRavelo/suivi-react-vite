import { faChevronRight, faLock, faUser } from "@fortawesome/free-solid-svg-icons"
import "./login.scss"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import LogoEuro from "../../assets/png/Logo_Euro.png"
import { Field, Form, Formik } from "formik"
import { validateLogin } from "../../utils/validationSchemas"
import { useState } from "react"
import { defaultAxios } from "../../api/axios"
import useAuth from "../../hooks/useAuth"
import { useNavigate } from "react-router-dom"

type formValue = {
  email: string | null,
  password: string | null
}

const initialValues: formValue = {
  email: "",
  password: ""
}

const Login = () => {
  const [error, setError] = useState<string | null>(null)
  const authContext = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (values: formValue) => {
    try {
      const res = await defaultAxios.post("/auth/login-web", values)

      if (!res.data.success) {
        if (res.data?.error) {
          setError(res.data.error)
        }
        return
      }
      authContext?.setAuth(res.data.user)
      navigate("/admin")
    } catch (error) {
      console.log("ERROR LOGIN", error)
      setError("Problème de serveur")
    }
  }

  return (
    <div className="container">
      <div className="screen">
        <div className="screen__content">
          <Formik initialValues={initialValues} onSubmit={(values) => handleSubmit(values)} validationSchema={validateLogin} >
            {({ errors }) => (<Form className="login">
              <img src={LogoEuro} alt="logo d'Europ'Alu" className="login__logo" />
              <div className="login__field">
                <FontAwesomeIcon icon={faUser} className="login__icon" />
                <Field name="email" inputMode="email" type="text" className="login__input" placeholder="Email" />
                {errors.email ? <p className="error">{errors.email}</p> : error ? <p className="error">{error}</p> : null}
              </div>
              <div className="login__field">
                <FontAwesomeIcon icon={faLock} className="login__icon" />
                <Field name="password" inputMode="password" type="password" className="login__input" placeholder="Mot de passe" />
                {errors.password ? <p className="error">{errors.password}</p> : error ? <p className="error">{error}</p> : null}
              </div>
              <button className="button login__submit" type="submit">
                <span className="button__text">Connexion</span>
                <FontAwesomeIcon icon={faChevronRight} className="button__icon fas fa-chevron-right" />
              </button>
            </Form>)}
          </Formik>
        </div>
        <div className="screen__background">
          <span className="screen__background__shape screen__background__shape4"></span>
          <span className="screen__background__shape screen__background__shape3"></span>
          <span className="screen__background__shape screen__background__shape2"></span>
          <span className="screen__background__shape screen__background__shape1"></span>
        </div>
      </div>
    </div>
  )
}

export default Login