/* eslint-disable react-hooks/exhaustive-deps */
import { DataGrid, GridToolbar } from "@mui/x-data-grid"
import { useEffect, useRef, useState } from "react"
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
import faExcel from "../../assets/png/xls.png"
import { utils, writeFileXLSX } from "xlsx";

type DataTableProps = {
    rows: ProductTypes | undefined | Users | Products | Suivis
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
    const imgRef = useRef<HTMLImageElement>(null)
    const productTypeContext = useProductType()
    const navigate = useNavigate()
    const [filter, setFilter] = useState(null)

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
    const handleProblem = (item: ProductType) => {
        productTypeContext?.setType(item)
        navigate(`/admin/problem/${item.id}`)
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
    const handleExportToExcel = async () => {
        if (filter && rows) {
            const filterEntries = Object.entries(filter)
            const filterRows = await Promise.all(rows?.map(item => {
                const row: { [key: string]: string } = {};
                const itemEntries = Object.entries(item);
                filterEntries.forEach(([key, value]) => {
                    if (key == item.id.toString() && value == true) {
                        itemEntries.forEach(([key, value]) => {
                            const matchingColumn = columns.find(col => col.field === key);
                            if (matchingColumn && value) {
                                if (matchingColumn.field == "observation" && typeof value == "string") {
                                    row[matchingColumn.headerName] = value.split(";")[0];
                                } else {
                                    row[matchingColumn.headerName] = value.toString();
                                }
                            }
                        });
                    }
                });

                return row;
            }))
                .then(items => items.filter(item => Object.keys(item).length > 0))
                .catch(err => console.log(err));
            if (filterRows) {
                const wb = utils.book_new();
                utils.book_append_sheet(wb, utils.json_to_sheet(filterRows));
                writeFileXLSX(wb, `${slug}.xlsx`);
            }
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
                    {slug !== "suivi" && (
                        <div onClick={() => handleEdit(params.row)}>
                            <img src={faEdit} alt="" />
                        </div>
                    )}
                    <div className="delete" onClick={() => handleDelete(params.row.id)}>
                        <img src={faDelete} alt="" />
                    </div>
                    {slug === "type" && isProductType(params.row) && params.row?.pdf && (
                        <div onClick={() => handleSingle(params.row)}>
                            <img src={faPDF} alt="" style={{ width: "20px", height: "20px", objectFit: "cover" }} />
                        </div>
                    )}
                    {slug === "type" && (
                        <div onClick={() => handleProblem(params.row)}>
                            <img src={faProblem} alt="" style={{ width: "25px", height: "25px", borderRadius: "5px" }} />
                        </div>
                    )}
                    {slug === "product" && isProduct(params.row) && (
                        <div onClick={() => handlePrint(params.row)}>
                            <img src={faQRCode} alt="" style={{ objectFit: "contain" }} />
                        </div>
                    )}
                </div>
            );
        },
        disableExport: true
    }

    useEffect(() => {
        setTimeout(() => {
            if (imgRef.current) {
                const btn = imgRef.current
                if (slug == "type" || slug == "user") {
                    if (btn) {
                        btn.style.opacity = "0";
                        btn.style.pointerEvents = "none";
                    }
                } else {
                    if (btn) {
                        btn.style.opacity = "1";
                        btn.style.pointerEvents = "all";
                    }
                }
            }
        }, 1);

    }, [imgRef.current, slug])

    return (
        <div className="dataTable">
            <img src={faExcel} ref={imgRef} alt="Image Excel" className="button-export" onClick={() => handleExportToExcel()} />
            {rows && rows?.length > 0 && <DataGrid
                className="dataGrid"
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
                        printOptions: { disableToolbarButton: true },
                    },
                }}
                pageSizeOptions={[slug == "suivi" ? 5 : 7]}
                disableRowSelectionOnClick
                disableColumnFilter
                disableDensitySelector
                disableColumnSelector
                onStateChange={(item) => setFilter(item.filter.filteredRowsLookup)}
            />}
        </div>
    )
}

export default DataTable

export type { Colums }
