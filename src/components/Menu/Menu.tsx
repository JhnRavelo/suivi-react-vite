import { faHome } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Link } from "react-router-dom"
import "./menu.scss"
import faProductType from "../../assets/svg/charpenterie.svg"

const Menu = () => {
  return (
    <div className="menu">
        <div className="item">
            <span className="title">MAIN</span>
            <Link to="/admin" className="listItem">
                <FontAwesomeIcon icon={faHome} className="icon" />
                <span className="listItemTitle">Home</span>
            </Link>
            <span className="title">LISTES</span>
            <Link to="/admin/type" className="listItem">
                <img src={faProductType} alt=""/>
                <span className="listItemTitle">Type de produits</span>
            </Link>
        </div>
    </div>
  )
}

export default Menu
