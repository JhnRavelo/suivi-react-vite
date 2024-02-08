import faTrash from "../../assets/svg/delete.svg"
import "./modalDelete.scss"

type ModalDeleteProps = {
    title: string
    setDeleteOpen: React.Dispatch<React.SetStateAction<boolean>>
    setDeleteRow: React.Dispatch<React.SetStateAction<number | null | undefined>>
    handleDelete: () => Promise<void>
}

const ModalDelete = ({title, setDeleteOpen, setDeleteRow, handleDelete}: ModalDeleteProps) => {

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
              Delete
            </button>
            <button
              className="cancel"
              onClick={() => {
                setDeleteOpen(false);
                setDeleteRow(null);
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default ModalDelete