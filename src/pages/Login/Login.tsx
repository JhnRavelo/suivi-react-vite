import { faChevronRight, faLock, faUser } from "@fortawesome/free-solid-svg-icons"
import "./login.scss"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import LogoEuro from "../../assets/png/Logo_Euro.png"

const Login = () => {
  return (
    <div className="container">
      <div className="screen">
        <div className="screen__content">
          <form className="login">
            <img src={LogoEuro} alt="logo Europ'Alu" className="login__logo" />
            <div className="login__field">
              <FontAwesomeIcon icon={faUser} className="login__icon" />
              <input type="text" className="login__input" placeholder="Email" />
            </div>
            <div className="login__field">
              <FontAwesomeIcon icon={faLock} className="login__icon" />
              <input type="password" className="login__input" placeholder="Mot de passe" />
            </div>
            <button className="button login__submit">
              <span className="button__text">Connexion</span>
              <FontAwesomeIcon icon={faChevronRight} className="button__icon fas fa-chevron-right" />
            </button>
          </form>
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