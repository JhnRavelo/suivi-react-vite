import { useState } from "react"
import DataTable, { Colums } from "../../../components/DataTable/DataTable"
import ModalDelete from "../../../components/ModalDelete/ModalDelete"
import useSuvi from "../../../hooks/useSuvi"
import { isSuivi } from "../../../utils/verificationType"
import "../ProductTypes/productTypes.scss"

const columns: Colums = [
    {
        field: "id",
        type: "string",
        inputMode: "text",
        headerName: "ID",
        placeholder: "Le type de produit",
        width: 40,
        disableExport: false,
    },
    {
        field: "tech",
        type: "string",
        inputMode: "text",
        headerName: "Nom de du technicien",
        placeholder: "Le nom d'utilisateur",
        width: 150,
        disableExport: false,
    },
    {
        field: "type",
        type: "string",
        inputMode: "text",
        headerName: "Type de ménuiserie",
        placeholder: "L'adresse Email",
        width: 150,
        disableExport: false
    },
    {
        field: "client",
        type: "string",
        inputMode: "text",
        headerName: "Nom du client",
        placeholder: "Numéro de télephone",
        width: 120,
        disableExport: false
    },
    {
        field: "devis",
        type: "password",
        inputMode: "password",
        headerName: "Numéro de devis",
        placeholder: "",
        width: 120,
        disableExport: false
    },
    {
        field: "chantier",
        type: "string",
        inputMode: "text",
        headerName: "Nom du chantier",
        placeholder: "Retapez le mot de passe",
        width: 120,
        disableExport: false
    },
    {
        field: "problem",
        type: "string",
        inputMode: "text",
        headerName: "Problème",
        placeholder: "choisir le fichier PDF",
        width: 200,
        disableExport: false
    },
    {
        field: "solution",
        type: "string",
        inputMode: "text",
        headerName: "Solution",
        placeholder: "La date",
        width: 200,
        disableExport: false,
    },
    {
        field: "observation",
        type: "string",
        inputMode: "text",
        headerName: "Observation",
        placeholder: "La date",
        width: 180,
        disableExport: false,
        renderCell: (params) => {
            if (isSuivi(params.row)) {
                const array = params.row.observation?.split(";")
                const imgs = array[1]?.split(",")
                return (
                    <div style={{ height: "100%" }}>
                        {array[0] && <p style={{ marginBottom: "5px" }}>{array[0]}</p>}
                        {(imgs.length && imgs[0] != "") &&
                            <section id='portfolio'>
                                <div className='row portfolio-content'>
                                    <div id='folio-wrap' className='bricks-wrapper'>
                                        <div className="galleryContainer">
                                            {imgs.map((gallery, index) => (
                                                <div key={index} className='brick folio-item'>
                                                    <a data-fancybox={`gallery${params.row.id}`} href={gallery}>
                                                        <img src={gallery} alt="" key={index} className="imgprod" />
                                                    </a>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </section>
                        }
                    </div>
                )
            } else {
                return (
                    <p></p>
                )
            }
        }
    },
    {
        field: "createdAt",
        type: "string",
        inputMode: "text",
        headerName: "Date création",
        placeholder: "La date",
        width: 120,
        disableExport: false,
    }
]

const Suivis = () => {
    const suiviContext = useSuvi()
    const [deleteOpen, setDeleteOpen] = useState<boolean>(false)
    const [deleteRow, setDeleteRow] = useState<null | number>(null)

    return (
        <>
            <div className="users">
                <div className="info">
                    <h1>Liste des suivis</h1>
                </div>
                <DataTable
                    slug="suivi"
                    columns={columns}
                    rows={suiviContext?.suivis}
                    setDeleteOpen={setDeleteOpen}
                    setDeleteRow={setDeleteRow}
                />

            </div>
            {deleteOpen && (
                <ModalDelete
                    setDeleteOpen={setDeleteOpen}
                    setDeleteRow={setDeleteRow}
                    title="ce suivi"
                    data="suivis"
                    url="/suivi/delete"
                    deleteRow={deleteRow}
                    setState={suiviContext?.setSuivis}
                />
            )}
        </>
    )
}

export default Suivis