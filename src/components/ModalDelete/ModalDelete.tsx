import faTrash from "../../assets/svg/delete.svg"
import useAxiosPrivate from "../../hooks/useAxiosPrivate"
import useCheckBox from "../../hooks/useCheckBox"
import { CheckBox, Data, Dispatch, URL } from "../Form/Form"
import "./modalDelete.scss"

type ModalDeleteProps = {
  title: string
  setDeleteOpen: React.Dispatch<React.SetStateAction<boolean>>
  setDeleteRow: React.Dispatch<React.SetStateAction<number | null>>
  deleteRow: number | null
  data: Data
  url: URL
  setState: Dispatch
  setCheckBox?: CheckBox
}

const ModalDelete = ({ title, setDeleteOpen, setDeleteRow, deleteRow, setState, data, url, setCheckBox }: ModalDeleteProps) => {
  const axiosPrivate = useAxiosPrivate()
  const checkBox = useCheckBox()

  const handleDelete = async () => {
    try {
      let res
      if (data == "suivis") {
        res = await axiosPrivate.post(`${url}`, { deleteId: deleteRow })
      } else res = await axiosPrivate.delete(`${url}/${deleteRow}`)
      if (res.data.success) {
        if (setState) {
          setState(res.data[data])
          if (setCheckBox) {
            checkBox(setCheckBox, res.data[data])
          }
          setDeleteOpen(false)
          setDeleteRow(null)
        }
      }

    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <div id="champDelete">
        <div className="delete__overlay"></div>
        <div className="delet__modal">
          <div
            className="x__mark"
            onClick={() => {
              setDeleteOpen(false);
              setDeleteRow(null);
            }}
          >
            X
          </div>
          <div className="modal__trash">
            <img src={faTrash} alt="" />
          </div>
          <h1 className="delete__h1">Suppression</h1>
          <p className="delete__p">
            Êtes-vous sûr de vouloir supprimer {title} ?
          </p>
          <div className="button__delete">
            <button className="suppr" onClick={() => handleDelete()}>
              Confirmez
            </button>
            <button
              className="cancel"
              onClick={() => {
                setDeleteOpen(false);
                setDeleteRow(null);
              }}
            >
              Annuler
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default ModalDelete