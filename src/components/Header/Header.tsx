import { Link, useLocation } from "react-router-dom"
import logoEuro from "../../assets/png/Logo_Euro.png"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBell, faChevronDown, faPowerOff, faUser } from "@fortawesome/free-solid-svg-icons"
import useAuth from "../../hooks/useAuth"
import { useEffect, useRef, useState } from "react"
import useHeader from "../../hooks/useHeader"
import "./header.scss"
import useLogout from "../../hooks/useLogout"
import useAxiosPrivate from "../../hooks/useAxiosPrivate"

const Header = () => {
  const { pathname } = useLocation()
  const headerContext = useHeader()
  const [notifNbr, setnotifNbr] = useState(headerContext?.notifs.length)
  const authContext = useAuth()
  const logout = useLogout()
  const axiosPrivate = useAxiosPrivate()
  const chevronRef = useRef<SVGSVGElement | null>(null)
  const selectDateRef = useRef<HTMLDivElement | null>(null)
  const notificationRef = useRef<HTMLDivElement | null>(null)

  const handleVisibleSelecteYear = () => {
    selectDateRef.current?.classList.toggle("visible");
    chevronRef.current?.classList.toggle("up");
  };

  const handleShowNotication = async () => {
    notificationRef.current?.classList.toggle("showed");
    try {
      const res = await axiosPrivate.get("/log/readLog")
      if (res.data.success) {
        setnotifNbr(0)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const handleClickYear = (value: string | number) => {
    headerContext?.setYear(value);
    selectDateRef.current?.classList.toggle("visible");
    chevronRef.current?.classList.toggle("up");
  };

  useEffect(() => {
    if (headerContext?.notifs && headerContext?.notifs.length > 0) {
      setnotifNbr(headerContext?.notifs.length)
    }
  }, [headerContext?.notifs])

  return (
    <div className="navbar">
      <div className="logo">
        <img src={logoEuro} alt="logo" />
        <span>{"Europ'Alu"}</span>
      </div>
      {(pathname == "/admin/" || pathname.includes("/admin/product/") || headerContext?.years?.length !== 0) && (
        <div className="date">
          <div className="selected__date">
            <h2 onClick={handleVisibleSelecteYear}>Année {headerContext?.year}</h2>
            <FontAwesomeIcon
              ref={chevronRef}
              className="chevron"
              icon={faChevronDown}
              onClick={handleVisibleSelecteYear}
            />
          </div>
          {headerContext?.years?.length
            && headerContext?.years?.length > 1 && (
              <div ref={selectDateRef} className="setect__date">
                {headerContext?.years.map((item, index) => (
                  <label
                    key={index}
                    onClick={() => handleClickYear(item)}
                  >
                    <input name="year" type="radio" value={item} />
                    année {item}
                  </label>
                ))}
              </div>
            )}
        </div>
      )}
      <div className="icons">
        <div ref={notificationRef} className="log">
          <div className="content">
            {headerContext?.notifs && headerContext.notifs.map((notif, index) => (
              <Link to="/admin/log" key={index}>
                <div className="journal" onClick={handleShowNotication}>
                  <div>
                    <h2>{notif.split(";")[0]}</h2>
                  </div>
                  <h2 className="date">{notif.split(";")[1]}</h2>
                </div>
              </Link>))}
          </div>
        </div>
        <div className="notification" onClick={handleShowNotication}>
          {notifNbr == 0 ? (
            <FontAwesomeIcon icon={faBell} className="icon" />
          ) : (
            <FontAwesomeIcon icon={faBell} className="icon" shake />
          )}
          {notifNbr !== 0 && <span> {notifNbr} </span>}
        </div>
        <div className="user">
          <FontAwesomeIcon icon={faUser} className="icon" />
          <span>{authContext?.auth?.name}</span>
        </div>
        <div className="logout" onClick={() => logout()}>
          <FontAwesomeIcon icon={faPowerOff} className="powerIcon" />
        </div>
      </div>
    </div>
  )
}

export default Header