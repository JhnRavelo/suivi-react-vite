/* eslint-disable react-hooks/exhaustive-deps */
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { useState } from "react";
import faEdit from "../../assets/svg/view.svg";
import faDelete from "../../assets/svg/delete.svg";
import faPDF from "../../assets/png/pdf.png";
import faQRCode from "../../assets/png/qrCode.png";
import faProblem from "../../assets/png/attention.png";
import "./dataTable.scss";
import { ProductType, ProductTypes } from "../../context/ProductTypeContext";
import useProductType from "../../hooks/useProductType";
import { useNavigate } from "react-router-dom";
import { User, Users } from "../../context/UserContext";
import { Products } from "../../context/ProductContext";
import { isProduct, isProductType } from "../../utils/verificationType";
import { Suivi, Suivis } from "../../context/SuiviContext";
import { Edit } from "../Form/Form";
import faExcel from "../../assets/png/xls.png";
import { utils, writeFileXLSX } from "xlsx";
import { Saves } from "../../context/SaveContext";
import faRestore from "../../assets/png/restaurer.png"
import faChart from "../../assets/svg/barChart.svg"

export type Rows = ProductTypes | undefined | Users | Products | Suivis | Saves

type DataTableProps = {
  rows: Rows;
  slug: "type" | "user" | "product" | "suivi" | "save";
  columns: Colums;
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  setEditRow?: React.Dispatch<React.SetStateAction<Edit>>;
  setDeleteOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  setDeleteRow?: React.Dispatch<React.SetStateAction<number | null>>;
  setPrintOpen?: React.Dispatch<React.SetStateAction<boolean>>;
};

type RenderCellParams = {
  row: Row;
};

type Colums = {
  field: string;
  headerName: string;
  width: number;
  disableExport: boolean;
  type: string;
  inputMode: string;
  placeholder: string;
  renderCell?: (params: RenderCellParams) => JSX.Element;
}[];

export type Row = ProductType | User | Suivi;

const DataTable = ({
  rows,
  slug,
  columns,
  setOpen,
  setEditRow,
  setDeleteOpen,
  setDeleteRow,
  setPrintOpen,
}: DataTableProps) => {
  const productTypeContext = useProductType();
  const navigate = useNavigate();
  const [filter, setFilter] = useState(null);

  const handleEdit = (item: Row) => {
    if (setOpen && setEditRow) {
      setOpen(true);
      setEditRow(item);
    }
  };
  const handleSingle = (item: ProductType) => {
    productTypeContext?.setType(item);
    navigate(`/admin/type/${item.id}`);
  };
  const handleProblem = (item: ProductType) => {
    productTypeContext?.setType(item);
    navigate(`/admin/problem/${item.id}`);
  };
  const handlePrint = (item: Row) => {
    if (setPrintOpen && setEditRow) {
      setEditRow(item);
      setPrintOpen(true);
    }
  };
  const handleDelete = (id: number) => {
    if (setDeleteOpen && setDeleteRow) {
      setDeleteRow(id);
      setDeleteOpen(true);
    }
  };
  const handleExportToExcel = async () => {
    if (filter && rows) {
      const filterEntries = Object.entries(filter);
      const filterRows = await Promise.all(
        rows?.map((item) => {
          const row: { [key: string]: string } = {};
          const itemEntries = Object.entries(item);
          filterEntries.forEach(([key, value]) => {
            if (key == item.id.toString() && value == true) {
              itemEntries.forEach(([key, value]) => {
                const matchingColumn = columns.find((col) => col.field === key);
                if (matchingColumn && value) {
                  if (
                    matchingColumn.field == "observation" &&
                    typeof value == "string"
                  ) {
                    row[matchingColumn.headerName] = value.split(";")[0];
                  } else {
                    row[matchingColumn.headerName] = value.toString();
                  }
                }
              });
            }
          });

          return row;
        })
      )
        .then((items) => items.filter((item) => Object.keys(item).length > 0))
        .catch((err) => console.log(err));
      if (filterRows) {
        const wb = utils.book_new();
        utils.book_append_sheet(wb, utils.json_to_sheet(filterRows));
        writeFileXLSX(wb, `${slug}.xlsx`);
      }
    }
  };
  const handleRestore = (id: number) => {
    if (setOpen && setDeleteRow) {
      setOpen(true)
      setDeleteRow(id)
    }

  }
  const filterColumns = columns.filter(
    (item) =>
      item.field !== "password" &&
      item.field != "pdf" &&
      item.field != "confirmPassword"
  );
  const actionColumn = {
    field: "action",
    headerName: "Action",
    width: 120,
    renderCell: (params: RenderCellParams) => {
      return (
        <div className="action">
          {(slug !== "suivi" && slug !== "save") && (
            <div onClick={() => handleEdit(params.row)}>
              <img src={faEdit} alt="image de Modification" />
            </div>
          )}
          <div onClick={() => handleDelete(params.row.id)}>
            <img src={faDelete} alt="image de Poubelle" />
          </div>
          {slug === "type" && isProductType(params.row) && params.row?.pdf && (
            <div onClick={() => handleSingle(params.row)}>
              <img
                src={faPDF}
                alt="image de PDF"
                style={{ height: "20px", objectFit: "cover" }}
              />
            </div>
          )}
          {slug === "type" && (
            <div onClick={() => handleProblem(params.row)}>
              <img
                src={faProblem}
                alt="image de Warning"
                style={{ width: "25px", height: "25px", borderRadius: "5px" }}
              />
            </div>
          )}
          {slug === "save" && (
            <div onClick={() => handleRestore(params.row.id)}>
              <img src={faRestore} alt="image de Restauration" />
            </div>
          )}
          {slug === "product" && isProduct(params.row) && (
            <>
              <div onClick={() => handlePrint(params.row)}>
                <img src={faQRCode} alt="image de QR Code" />
              </div>
              <div onClick={() => navigate(`/admin/product/${params.row.id}`)}>
                <img src={faChart} alt="image Chart" />
              </div>
            </>
          )}
        </div>
      );
    },
    disableExport: true,
  };

  return (
    <>
      {(slug == "product" || slug == "suivi") && rows && rows?.length > 0 && <img
        src={faExcel}
        alt="Image Excel"
        className="button-export"
        onClick={() => handleExportToExcel()}
      />}
      <div className="dataTable">
        {rows && rows?.length > 0 && (
          <DataGrid
            className="dataGrid"
            rows={rows}
            columns={[...filterColumns, actionColumn]}
            rowHeight={slug == "suivi" ? 60 : 50}
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
          />
        )}
      </div>
    </>
  );
};

export default DataTable;

export type { Colums };
