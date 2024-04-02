import { ErrorMessage, FormikErrors } from "formik";
import imgPDF from "../../assets/png/pdf.png"
import imgGallery from "../../assets/png/gallery.png"
import { InitialValues } from "./Form";

type InputFileProps = {
  name: "pdf" | "avatar",
  setFieldValue: (field: string, value: InitialValues, shouldValidate?: boolean | undefined) => Promise<void | FormikErrors<InitialValues>>
  value: string | undefined
}

const InputFile = ({ name, setFieldValue, value }: InputFileProps) => {
  return (
    <>
      <input
        style={{ display: "none" }}
        id={name}
        type="file"
        name={name}
        onChange={(e) => {
          if (e.target.files && e.target.files?.length > 0) {
            const file = e.target.files[0]
            setFieldValue(name, file);
          }
        }}
      />
      <label htmlFor={name} className="labelInput">
        <img src={name == "pdf" ? imgPDF : imgGallery} alt="" style={{ width: "20px", height: "20px" }} />
        <span style={value ? { fontSize: "9px" } : undefined}>{value ? value : "Ajouter le fichier"}</span>
      </label>
      <ErrorMessage component={"p"} className="error" name={name} />
    </>
  )
}

export default InputFile
