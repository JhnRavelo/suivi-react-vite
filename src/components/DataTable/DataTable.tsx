import { DataGrid, GridToolbar } from "@mui/x-data-grid"
import { useEffect, useRef } from "react"
import faEdit from "../../assets/svg/view.svg"
import faDelete from "../../assets/svg/delete.svg"
import faPDF from "../../assets/png/pdf.png"
import "./dataTable.scss"
import { ProductType, ProductTypes } from "../../context/ProductTypeContext"

type DataTableProps = {
    rows: ProductTypes | [] | undefined
    slug: string
    columns: Colums
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
    setEditRow: React.Dispatch<React.SetStateAction<ProductType | null>>
    setDeleteOpen: React.Dispatch<React.SetStateAction<boolean>>
    setDeleteRow: React.Dispatch<React.SetStateAction<number | null | undefined>>
}

type Colums = {
    field: string;
    headerName: string;
    width: number;
    disableExport: boolean;
    type: string;
    inputMode?: string;
    placeholder?: string;
}[]


type RenderCellParams = {
    row: Row
}

type Row = ProductType

const DataTable = ({ rows, slug, columns, setOpen, setEditRow, setDeleteOpen, setDeleteRow }: DataTableProps) => {
    const tableRef = useRef<HTMLDivElement>(null)

    const handleEdit = (item: Row) => {
        setOpen(true)
        setEditRow(item)
    }
    const handleSingle = (item: Row) => {
        console.log(item)
    }

    const handleDelete = (id: number) => {
        setDeleteRow(id)
        setDeleteOpen(true)
    }

    const filterColumns = columns.filter(item => (item.field !== "password" && item.field != "pdf"))

    const actionColumn = {
        field: "action",
        headerName: "Action",
        width: 100,
        renderCell: (params: RenderCellParams) => {
            return (
                <div className="action">
                    <div onClick={() => handleEdit(params.row)}>
                        <img src={faEdit} alt="" />
                    </div>
                    <div className="delete" onClick={() => handleDelete(params.row.id)}>
                        <img src={faDelete} alt="" />
                    </div>
                    {slug == "type" && params.row?.pdf && (
                        <div onClick={() => handleSingle(params.row)}>
                            <img src={faPDF} alt="" />
                        </div>
                    )}
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
                rowHeight={50}
                initialState={{
                    pagination: {
                        paginationModel: {
                            pageSize: 7,
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
                pageSizeOptions={[7]}
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
