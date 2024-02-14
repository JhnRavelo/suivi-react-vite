import { DataGrid, GridToolbar } from "@mui/x-data-grid"
import { useEffect, useRef } from "react"
import faEdit from "../../assets/svg/view.svg"
import faDelete from "../../assets/svg/delete.svg"
import faPDF from "../../assets/png/pdf.png"
import faQRCode from "../../assets/png/qrCode.png"
import faProblem from "../../assets/png/attention.png"
import "./dataTable.scss"
import { ProductType, ProductTypes } from "../../context/ProductTypeContext"
import useProductType from "../../hooks/useProductType"
import { useNavigate } from "react-router-dom"
import { User, Users } from "../../context/UserContext"
import { Products } from "../../context/ProductContext"
import { isProduct, isProductType } from "../../utils/verificationType"
import { Suivi, Suivis } from "../../context/SuiviContext"
import { Edit } from "../Form/Form"

type DataTableProps = {
    rows: ProductTypes | [] | undefined | Users | Products | Suivis
    slug: "type" | "user" | "product" | "suivi"
    columns: Colums
    setOpen?: React.Dispatch<React.SetStateAction<boolean>>
    setEditRow?: React.Dispatch<React.SetStateAction<Edit>>
    setDeleteOpen?: React.Dispatch<React.SetStateAction<boolean>>
    setDeleteRow?: React.Dispatch<React.SetStateAction<number | null>>
    setPrintOpen?: React.Dispatch<React.SetStateAction<boolean>>
}

type RenderCellParams = {
    row: Row
}
type Colums = {
    field: string;
    headerName: string;
    width: number;
    disableExport: boolean;
    type: string;
    inputMode: string;
    placeholder: string;
    renderCell?: (params: RenderCellParams) => JSX.Element
}[]

export type Row = ProductType | User | Suivi

const DataTable = ({ rows, slug, columns, setOpen, setEditRow, setDeleteOpen, setDeleteRow, setPrintOpen }: DataTableProps) => {
    const tableRef = useRef<HTMLDivElement>(null)
    const productTypeContext = useProductType()
    const navigate = useNavigate()

    const handleEdit = (item: Row) => {
        if (setOpen && setEditRow) {
            setOpen(true)
            setEditRow(item)
        }
    }
    const handleSingle = (item: ProductType) => {
        productTypeContext?.setType(item)
        navigate(`/admin/type/${item.id}`)
    }

    const handlePrint = (item: Row) => {
        if (setPrintOpen && setEditRow) {
            setEditRow(item)
            setPrintOpen(true)
        }
    }

    const handleDelete = (id: number) => {
        if (setDeleteOpen && setDeleteRow) {
            setDeleteRow(id)
            setDeleteOpen(true)
        }
    }

    const filterColumns = columns.filter(item => (item.field !== "password" && item.field != "pdf" && item.field != "confirmPassword"))

    const actionColumn = {
        field: "action",
        headerName: "Action",
        width: 120,
        renderCell: (params: RenderCellParams) => {
            return (
                <div className="action">
                    {slug !== "suivi" && <div onClick={() => handleEdit(params.row)}>
                        <img src={faEdit} alt="" />
                    </div>}
                    <div className="delete" onClick={() => handleDelete(params.row.id)}>
                        <img src={faDelete} alt="" />
                    </div>
                    {slug == "type" && isProductType(params.row) && params.row?.pdf && (
                        <div onClick={() => handleSingle(params.row as ProductType)} style={{ paddingTop: "5px" }}>
                            <img src={faPDF} alt="" style={{ width: "20px", height: "20px", objectFit: "cover" }} />
                        </div>
                    )}
                    {
                        slug === "type" && (
                            <div style={{ paddingTop: "4px" }}>
                                <img src={faProblem} alt="" style={{ width: "25px", height: "25px", borderRadius: "5px" }} />
                            </div>
                        )

                    }
                    {slug == "product" && isProduct(params.row) && (
                        <div onClick={() => handlePrint(params.row)}  >
                            <img src={faQRCode} alt="" style={{ objectFit: "contain" }} />
                        </div>
                    )

                    }
                </div>
            );
        },
        disableExport: true
    }

    useEffect(() => {
        if (tableRef.current?.querySelector("button")) {
            if (slug == "type") {
                const btn = tableRef.current.querySelector("button")
                if (btn) {
                    btn.style.display = "none"
                }
            }
        }

    }, [slug, tableRef])

    return (
        <div className="dataTable">
            {rows && <DataGrid
                className="dataGrid"
                ref={tableRef}
                rows={rows}
                columns={
                    [...filterColumns, actionColumn]
                }
                rowHeight={slug == "suivi" ? 70 : 50}
                initialState={{
                    pagination: {
                        paginationModel: {
                            pageSize: slug == "suivi" ? 5 : 7,
                        },
                    },
                }}
                slots={{ toolbar: GridToolbar }}
                slotProps={{
                    toolbar: {
                        showQuickFilter: true,
                        quickFilterProps: { debounceMs: 500 },
                        csvOptions: { disableToolbarButton: true },
                        printOptions: {
                            hideFooter: true,
                            hideToolbar: true,
                        },
                    },
                }}
                pageSizeOptions={[slug == "suivi" ? 5 : 7]}
                disableRowSelectionOnClick
                disableColumnFilter
                disableDensitySelector
                disableColumnSelector
            />}
        </div>
    )
}

export default DataTable

export type { Colums }
