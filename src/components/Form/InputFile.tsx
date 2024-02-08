import { ErrorMessage, FormikErrors } from "formik";
import fileImg from "../../assets/svg/fichier-pdf.svg"
import { InitialValuesType } from "../../pages/Admin/ProductTypes/ProductTypes";

type InputFileProps = {
    name: "pdf",
    setFieldValue : (field: string, value: File, shouldValidate?: boolean | undefined) => Promise<void | FormikErrors<InitialValuesType>>
    value: InitialValuesType
}

const InputFile = ({name, setFieldValue, value}: InputFileProps) => {
  return (
    <>
    <input
      style={{ display: "none" }}
      id={name}
      type="file"
      name={name}
    //   accept={accept}
      onChange={(e) => {
        if (e.target.files) {
            const file = e.target.files[0]
          setFieldValue(name, file);
        }
      }}
    />
    <label htmlFor={name} className="labelInput">
      <img src={fileImg} alt="" style={{width: "20px", height: "20px"}} />
      <span style={value[name] ? {fontSize:"9px"} : undefined}>{value[name] ? value[name]?.name : "Ajouter le fichier PDF"}</span>
    </label>
    <ErrorMessage component={"p"} className="error" name={name}/>
  </>
  )
}

export default InputFile
