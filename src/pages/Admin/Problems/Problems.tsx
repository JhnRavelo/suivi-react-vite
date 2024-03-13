/* eslint-disable react-hooks/exhaustive-deps */
import { useParams } from "react-router-dom";
import "../ProductType/productType.scss";
import { useEffect, useState } from "react";
import useProductType from "../../../hooks/useProductType";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import AddForm, { Edit } from "../../../components/Form/Form";
import { Colums } from "../../../components/DataTable/DataTable";
import { validateType } from "../../../utils/validationSchemas";
import { isProblem } from "../../../utils/verificationType";
import useProblem from "../../../hooks/useProblem";
import ModalDelete from "../../../components/ModalDelete/ModalDelete";
import ChartPie from "../../../components/PieChart/ChartPie";
import "../Home/home.scss"
import useHeader from "../../../hooks/useHeader";
import generateColor from "../../../utils/generateColor";

export type InitialValuesProblem = {
    name: string
    productTypeId?: string
}

const columns: Colums = [
    {
        field: "name",
        type: "string",
        inputMode: "text",
        headerName: "Type de produit",
        placeholder: "Le type de produit",
        width: 210,
        disableExport: true,
    },
]

const initialChartData = [{ name: "", value: 0, color: "#fff" },]

const Problems = () => {
    const { id } = useParams()
    const productTypeContext = useProductType()
    const [open, setOpen] = useState<boolean>(false)
    const [editRow, setEditRow] = useState<Edit>(null)
    const [deleteRow, setDeleteRow] = useState<number | null>(null)
    const [deleteOpen, setDeleteOpen] = useState(false)
    const [chartData, setChartData] = useState(initialChartData)
    const problemContext = useProblem()
    const headerContext = useHeader()

    const initialValues: InitialValuesProblem = {
        name: "",
        productTypeId: id,
    }

    useEffect(() => {
        if (productTypeContext?.types) {
            const type = productTypeContext.types.filter(item => item.id.toString() == id)
            productTypeContext.setType(type[0])
        }
        if (problemContext?.problems) {
            const problems = problemContext.problems.filter(item => item.productTypeId.toString() == id)
            problemContext.setProblemsByType(problems)
        }
        if (problemContext?.statProblems) {
            const statProblemCurrentYear = problemContext.statProblems.
                filter(item => item.year == headerContext?.year && item.productTypeId.toString() == id)
            const chartDataProblem = statProblemCurrentYear.map(item => {
                const color = generateColor()
                return {
                    name: item.name,
                    value: item.count,
                    color: color
                }
            })
            setChartData(chartDataProblem)
        }
    }, [id, productTypeContext, problemContext?.problems, headerContext?.year, problemContext?.statProblems])

    return (
        <div className="product" style={{ display: 'flex', }}>
            <div className="single" style={{ flex: 3 }}>
                <div className="view" style={{ width: "100%" }}>
                    <div className="info">
                        <div className="topInfo">
                            <h1>{productTypeContext?.type?.name}</h1>
                            <button className="addButton" onClick={() => setOpen(true)}>
                                <FontAwesomeIcon icon={faPlus} beat />
                                Ajout d'un problème
                            </button>
                        </div>
                    </div>
                    <hr />
                    <div className="details">
                        <h3 >La liste des problèmes lié à ce type de ménuiserie</h3>
                        <div className="problemContainer">
                            {problemContext?.problemsByType &&
                                problemContext.problemsByType.map((item, index) => (
                                    <div className="item" key={index} >
                                        <FontAwesomeIcon icon={faEdit} className="icon" onClick={() => {
                                            setEditRow(item);
                                            setOpen(true)
                                        }}
                                        />
                                        <FontAwesomeIcon icon={faTrash} className="icon" onClick={() => {
                                            setDeleteRow(item.id)
                                            setDeleteOpen(true)
                                        }} />
                                        <p>{item.name}</p>
                                    </div>
                                ))}
                        </div>
                    </div>
                </div>
            </div>
            <div className="box" style={{ flex: 2 }}>
                <ChartPie chartData={chartData} />
            </div>
            {open && (
                <AddForm
                    slug="problème"
                    columns={columns}
                    setOpen={setOpen}
                    editRow={editRow}
                    setEditRow={setEditRow}
                    initialValues={isProblem(editRow) && editRow ? { name: editRow.name } : initialValues}
                    validate={validateType}
                    url="/problem"
                    data="problems"
                    setState={problemContext?.setProblems}
                />
            )}
            {deleteOpen && (
                <ModalDelete
                    title={`ce problème`}
                    setDeleteOpen={setDeleteOpen}
                    setDeleteRow={setDeleteRow}
                    setState={problemContext?.setProblems}
                    deleteRow={deleteRow}
                    data="problems"
                    url="/problem"
                />
            )}
        </div>
    );
};

export default Problems;
