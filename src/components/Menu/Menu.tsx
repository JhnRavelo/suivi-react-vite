import { faHome } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Link } from "react-router-dom"
import "./menu.scss"
import faProductType from "../../assets/svg/charpenterie.svg"
import faUser from "../../assets/svg/profile.svg"
import faProduct from "../../assets/svg/product.svg"
import faSuivi from "../../assets/svg/suivi.svg"
import faLog from "../../assets/svg/log.svg"

const Menu = () => {
  return (
    <div className="menu">
      <div className="item">
        <span className="title">MAIN</span>
        <Link to="/admin" className="listItem">
          <FontAwesomeIcon icon={faHome} className="icon" />
          <span className="listItemTitle">Home</span>
        </Link>
        <span className="title">GESTION</span>
        <Link to="/admin/type" className="listItem">
          <img src={faProductType} alt="" />
          <span className="listItemTitle">Type de produits</span>
        </Link>
        <Link to="/admin/user" className="listItem">
          <img src={faUser} alt="" style={{ width: "20px" , height: "15px"}} />
          <span className="listItemTitle">Utilisateurs</span>
        </Link>
        <Link to="/admin/product" className="listItem">
          <img src={faProduct} alt="" style={{ width: "20px", height: "18px" }} />
          <span className="listItemTitle">Produits</span>
        </Link>
        <span className="title">LISTES</span>
        <Link to="/admin/suivi" className="listItem">
          <img src={faSuivi} alt="" style={{ width: "20px", height: "20px" }} />
          <span className="listItemTitle">Suivis</span>
        </Link>
        <Link to="/admin/log" className="listItem">
          <img src={faLog} alt="" style={{ width: "20px", height: "20px" }} />
          <span className="listItemTitle">Journals</span>
        </Link>
      </div>
    </div>
  )
}

export default Menu
