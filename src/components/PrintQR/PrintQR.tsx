import { useRef } from "react";
import useUser from "../../hooks/useUser";
import { isProduct } from "../../utils/verificationType";
import { Edit } from "../Form/Form";
import "../ModalDelete/modalDelete.scss";
import { useReactToPrint } from "react-to-print";
import logoEuro from "../../assets/png/Logo_Euro.png";
import { QRCode } from "react-qrcode-logo";

type PrintQRProps = {
  setPrintOpen: React.Dispatch<React.SetStateAction<boolean>>;
  editRow: Edit;
  setEditRow: React.Dispatch<React.SetStateAction<Edit>>;
};

const PrintQR = ({ setPrintOpen, editRow, setEditRow }: PrintQRProps) => {
  const userContext = useUser();
  const printRef = useRef<HTMLDivElement | null>(null);

  const handlePrint = useReactToPrint({
    content: () => printRef.current,
    bodyClass: "print-body",
  });

  return (
    <div id="champDelete">
      <div className="delete__overlay"></div>
      <div className="delet__modal" style={{ width: "420px", height: "500px" }}>
        <div
          className="x__mark"
          onClick={() => {
            setPrintOpen(false);
            setEditRow(null);
          }}
        >
          X
        </div>
        <h1 className="delete__h1">Impression du QRCode</h1>
        <div className="qrCode" ref={printRef}>
          <QRCode
            value={`${
              isProduct(editRow) &&
              editRow?.tech &&
              userContext?.users?.filter((item) => item.name == editRow.tech)[0]
                .email +
                "," +
                editRow.id
            }`}
            logoImage={logoEuro}
            logoWidth={70}
            qrStyle="squares"
            size={340}
          />
        </div>
        <div className="button__delete">
          <button
            className="print"
            style={{ backgroundColor: "#000f22" }}
            onClick={handlePrint}
          >
            Imprimer
          </button>
          <button
            className="cancel"
            onClick={() => {
              setPrintOpen(false);
              setEditRow(null);
            }}
          >
            Annuler
          </button>
        </div>
      </div>
    </div>
  );
};

export default PrintQR;
