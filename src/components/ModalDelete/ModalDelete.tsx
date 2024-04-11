import faTrash from "../../assets/png/poubelle.png";
import faRestore from "../../assets/png/restaurer.png";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import useCheckBox from "../../hooks/useCheckBox";
import { CheckBox, Data, Dispatch, URL } from "../Form/Form";
import "./modalDelete.scss";
import { isStateBool } from "../../utils/verificationType";
import useSave from "../../hooks/useSave";

type ModalDeleteProps = {
  title: string;
  setDeleteOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setDeleteRow: React.Dispatch<React.SetStateAction<number | null>>;
  deleteRow: number | null;
  data: Data;
  url: URL;
  setState: Dispatch;
  setCheckBox?: CheckBox;
  modal?: "delete" | "restore";
};

const ModalDelete = ({
  title,
  setDeleteOpen,
  setDeleteRow,
  deleteRow,
  setState,
  data,
  url,
  setCheckBox,
  modal,
}: ModalDeleteProps) => {
  const axiosPrivate = useAxiosPrivate();
  const checkBox = useCheckBox();
  const saveContext = useSave();

  const handleDelete = async () => {
    try {
      let res;
      if (data == "suivis") {
        res = await axiosPrivate.post(`${url}`, { deleteId: deleteRow });
      } else if (data == "files") {
        const file = saveContext?.saves.find((item) => item.id == deleteRow);
        res = await axiosPrivate.post(`${url}`, { file: file });
      } else res = await axiosPrivate.delete(`${url}/${deleteRow}`);
      if (res.data.success) {
        if (setState) {
          if ((modal == "restore" || data == "suivis") && isStateBool(setState)) {
            setState((prev: boolean) => !prev);
          } else setState(res.data[data]);
          if (setCheckBox) {
            checkBox(setCheckBox, res.data[data]);
          }
          setDeleteOpen(false);
          setDeleteRow(null);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

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
            <img
              src={modal == "restore" ? faRestore : faTrash}
              alt="image de modal"
            />
          </div>
          <h1 className="delete__h1">
            {modal == "restore" ? "Restauration" : "Suppression"}
          </h1>
          <p className="delete__p">
            {modal == "restore"
              ? "Êtes-vous sûr de vouloir restaurer vers cet date ?"
              : "Êtes-vous sûr de vouloir supprimer" + title + "?"}
          </p>
          <div className="button__delete">
            <button
              className="suppr"
              style={
                modal == "restore" ? { backgroundColor: "greenyellow" } : {}
              }
              onClick={() => handleDelete()}
            >
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
  );
};

export default ModalDelete;
