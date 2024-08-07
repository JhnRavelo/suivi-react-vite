import { faHome } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import "./menu.scss";
import faProductType from "../../assets/svg/charpenterie.svg";
import faUser from "../../assets/svg/profile.svg";
import faProduct from "../../assets/svg/product.svg";
import faSuivi from "../../assets/svg/suivi.svg";
import faLog from "../../assets/svg/log.svg";
import faSave from "../../assets/svg/base-de-donnees.svg";
import faAdmin from "../../assets/svg/admin.svg"

const Menu = () => {
  return (
    <menu>
      <div className="menu">
        <div className="item">
          <span className="title">MAIN</span>
          <Link to="/admin" className="listItem">
            <FontAwesomeIcon icon={faHome} className="icon" />
            <span className="listItemTitle">Home</span>
          </Link>
          <Link to="/admin/profile" className="listItem">
            <img src={faAdmin} alt="" />
            <span className="listItemTitle">Profile</span>
          </Link>
          <span className="title">GESTION</span>
          <Link to="/admin/type" className="listItem">
            <img src={faProductType} alt="" />
            <span className="listItemTitle">Type de produits</span>
          </Link>
          <Link to="/admin/user" className="listItem">
            <img
              src={faUser}
              alt=""
              style={{ width: "20px", height: "15px" }}
            />
            <span className="listItemTitle">Utilisateurs</span>
          </Link>
          <Link to="/admin/product" className="listItem">
            <img
              src={faProduct}
              alt=""
              style={{ width: "20px", height: "18px" }}
            />
            <span className="listItemTitle">Produits</span>
          </Link>
          <span className="title">LISTES</span>
          <Link to="/admin/suivi" className="listItem">
            <img src={faSuivi} alt="" className="img" />
            <span className="listItemTitle">Suivis</span>
          </Link>
          <Link to="/admin/log" className="listItem">
            <img src={faLog} alt="" className="img" />
            <span className="listItemTitle">Journals</span>
          </Link>
          <Link to="/admin/save" className="listItem">
            <img src={faSave} alt="" className="img" />
            <span className="listItemTitle">Save</span>
          </Link>
        </div>
      </div>
    </menu>
  );
};

export default Menu;
