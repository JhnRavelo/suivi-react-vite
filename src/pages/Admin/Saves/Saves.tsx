import { useState } from "react";
import DataTable, { Colums } from "../../../components/DataTable/DataTable";
import useSave from "../../../hooks/useSave";
import "../ProductTypes/productTypes.scss"
import ModalDelete from "../../../components/ModalDelete/ModalDelete";
import useHeader from "../../../hooks/useHeader";

const columns: Colums = [
    {
        field: "name",
        type: "string",
        inputMode: "text",
        headerName: "ID du sauvegarde",
        placeholder: "",
        width: 180,
        disableExport: true,
    },
    {
        field: "createdAt",
        type: "string",
        inputMode: "text",
        headerName: "Date du sauvegarde",
        placeholder: "",
        width: 220,
        disableExport: true,
    },
]

const Saves = () => {
    const [deleteOpen, setDeleteOpen] = useState(false)
    const [open, setOpen] = useState(false)
    const [deleteRow, setDeleteRow] = useState<number | null>(null)
    const saveContext = useSave()
    const headerContext = useHeader()
    return (
        <>
            <div className="users">
                <div className="info">
                    <h1>Liste des sauvegardes</h1>
                </div>
                <DataTable
                    slug="save"
                    columns={columns}
                    rows={saveContext?.saves}
                    setDeleteOpen={setDeleteOpen}
                    setOpen={setOpen}
                    setDeleteRow={setDeleteRow}
                />
            </div>
            {(deleteOpen || open) &&
                <ModalDelete
                title="Sauvegarde"
                setDeleteOpen={deleteOpen ? setDeleteOpen : setOpen}
                deleteRow={deleteRow}
                data="files"
                url={deleteOpen ? "/data/delete/export" : "/data/restore/export"}
                setState={deleteOpen ? saveContext?.setSaves : headerContext?.setIsImport}
                setDeleteRow={setDeleteRow}
                modal={open ? "restore" : "delete"}
                />
            }
        </>
    );
};

export default Saves;
