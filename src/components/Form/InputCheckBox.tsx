import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ErrorMessage, Field } from "formik";
import { useRef } from "react";

type InputCHeckBoxProps = {
  type: string[] | undefined | null
  title: string
  name: string
  arrays: string[] | undefined | null
}

const InputCHeckBox = ({ type, arrays, title, name }: InputCHeckBoxProps) => {
  const btnListRef = useRef<HTMLDivElement | null>(null);
  const typeRef = useRef<HTMLUListElement | null>(null);

  const handleListClick = () => {
    const btnList = btnListRef.current;
    const typeList = typeRef.current;
    btnList?.classList.toggle("open");
    typeList?.classList.toggle("open");
  };
  return (
    <div className="item">
      <div className="menu-deroulant">
      <label>{title}</label>

        <div className="containerList">
          <div
            className="select-btn"
            ref={btnListRef}
            onClick={handleListClick}
          >
            <span className="btn-text">{type ? type[0] : ""}</span>
            <span className="arrow-dwn">
              <FontAwesomeIcon
                icon={faChevronDown}
                className="fa-solid fa-chevron-down"
              />
            </span>
          </div>
          <ul className="list-type" ref={typeRef}>
            {arrays && arrays.map((array:string, index:number) => (
              <label className="type" key={index}>
                <Field
                  className="checkbox"
                  type="checkbox"
                  name={name}
                  value={array}
                />
                <span className="item-text">{array}</span>
              </label>
            ))}
          </ul>
          <ErrorMessage name={name} component={"p"} className="error" />
        </div>
      </div>
    </div>
  );
};

export default InputCHeckBox;
