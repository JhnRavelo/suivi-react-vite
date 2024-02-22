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
import { faEdit, faPlus } from "@fortawesome/free-solid-svg-icons";
import AddForm, { Edit, InitialValues } from "../../../components/Form/Form";
import { Colums } from "../../../components/DataTable/DataTable";
import { validateType } from "../../../utils/validationSchemas";
import { isInitialValuesProblem, isProblem } from "../../../utils/verificationType";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import useProblem from "../../../hooks/useProblem";

export type InitialValuesProblem = {
    name: string
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

const initialValues: InitialValuesProblem = {
    name: "",
}

const Problems = () => {
    const { id } = useParams()
    const productTypeContext = useProductType()
    const [open, setOpen] = useState<boolean>(false)
    const [editRow, setEditRow] = useState<Edit>(null)
    const axiosPrivate = useAxiosPrivate()
    const problemContext = useProblem()

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

    // useEffect(() => {
    // }, [id, problemContext])

    const handleSubmit = async (values: InitialValues) => {
        if (isInitialValuesProblem(values)) {
            const formData = new FormData()
            console.log(values.name)
            if (!id || !values.name) return
            formData.append("productTypeId", id)
            formData.append("name", values.name)
            if (editRow) {
                formData.append("id", `${editRow.id}`)
                const res = await axiosPrivate.put("/problem", formData)
                if (res.data.success) {
                    problemContext?.setProblems(res.data.problems)
                    setOpen(false)
                    setEditRow(null)
                }
            } else {
                const res = await axiosPrivate.post("/problem", formData)
                if (res.data.success) {
                    problemContext?.setProblems(res.data.problems)
                    setOpen(false)
                }
            }

        }
    }

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
                {/* <div className="activities">
          <h2>Dernier activités</h2>
          {activities && (
            <ul>
              {activities.map((activity, index) => {
                const time = activity.time.split(":")
                return (
                  <li key={index}>
                    <div>
                      <p>{`${activity.user.name} est intéressé par ce produit`}</p>
                      <time>{`${activity.date} ${time[0]}:${time[1]}`}</time>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </div> */}
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
                    handleSubmit={handleSubmit}
                />
            )}
        </div>
    );
};

export default Problems;
