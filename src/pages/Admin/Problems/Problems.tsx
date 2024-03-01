/* eslint-disable react-hooks/exhaustive-deps */
// import {
//     Legend,
//     Line,
//     LineChart,
//     ResponsiveContainer,
//     Tooltip,
//     XAxis,
//     YAxis,
// } from "recharts";
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


const Problems = () => {
    const { id } = useParams()
    const productTypeContext = useProductType()
    const [open, setOpen] = useState<boolean>(false)
    const [editRow, setEditRow] = useState<Edit>(null)
    const [deleteRow, setDeleteRow] = useState<number | null>(null)
    const [deleteOpen, setDeleteOpen] = useState(false)
    const problemContext = useProblem()

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
    }, [id, productTypeContext, problemContext?.problems])

    return (
        <div className="product">
            <div className="single">
                <div className="view">
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
                    {/* {data && (
                        <div className="chart">
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart
                                    width={500}
                                    height={300}
                                    data={data}
                                    margin={{
                                        top: 5,
                                        right: 30,
                                        left: 20,
                                        bottom: 5,
                                    }}
                                >
                                    <XAxis dataKey="name" />
                                    <YAxis />
                                    <Tooltip />
                                    <Legend />
                                    {chart.dataKeys.map((dataKey, index) => (
                                        <Line
                                            key={index}
                                            type="monotone"
                                            dataKey={dataKey.name}
                                            stroke={dataKey.color}
                                        />
                                    ))}
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    )} */}
                </div>
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
