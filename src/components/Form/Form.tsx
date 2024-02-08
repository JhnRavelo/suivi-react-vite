import { ErrorMessage, Field, Form, Formik } from "formik";
import { useEffect, useState } from "react";
import { ProductType } from "../../context/ProductTypeContext";
import { Colums } from "../DataTable/DataTable"
import { InitialValuesType } from "../../pages/Admin/ProductTypes/ProductTypes";
import * as Yup from "yup"
import "./form.scss"
import InputFile from "./InputFile";

type AddFormProps = {
    slug: string
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
    setEditRow: React.Dispatch<React.SetStateAction<ProductType | null>>
    editRow: ProductType | null
    columns: Colums
    initialValues: InitialValuesType
    validate: Yup.ObjectSchema<{
        name: string;
    }, Yup.AnyObject, {
        name: undefined;
    }, "">
    handleSubmit: (value:InitialValuesType)=>void
}

const AddForm = ({ setOpen, setEditRow, slug, columns, validate, initialValues, editRow, handleSubmit }: AddFormProps) => {
    const [formTitle, setFormTitle] = useState<string | null>(null)

    useEffect(() => {
        (() => {
            if (editRow) {
                setFormTitle("Modifier le")
            } else {
                setFormTitle("Ajouter un nouveau")
            }
        })()
    }, [editRow, initialValues])

    return (
        <div className="add">
            <div className="modal">
                <span
                    className="close"
                    onClick={() => {
                        setOpen(false);
                        setEditRow(null);
                    }}
                >
                    X
                </span>
                <h1>
                    {formTitle} {slug}
                </h1>
                <Formik
                    validationSchema={validate}
                    initialValues={initialValues}
                    onSubmit={(value) => handleSubmit(value)}
                >

                    {({setFieldValue, values})=>(<Form>
                        {columns
                            .filter(
                                (item) =>
                                    item.field !== "id" &&
                                    item.field !== "img" &&
                                    item.field !== "connected" &&
                                    item.field !== "createdAt"
                            )
                            .map((column, index) => {
                                if(column.field == "pdf"){
                                    return (
                                        <div className="item" key={index}>
                                            <label>{column.headerName}</label>
                                            <InputFile name={column.field} setFieldValue={setFieldValue} value={values}/>
                                        </div>
                                    )
                                }
                                return (
                                    <div className="item" key={index}>
                                        <label>{column.headerName}</label>
                                        <Field
                                            type={column.type}
                                            name={column.field}
                                            inputMode={column.inputMode}
                                            placeholder={column.placeholder}
                                        />
                                        <ErrorMessage
                                            name={column.field}
                                            component={"p"}
                                            className="error"
                                        />
                                    </div>
                                )
                            })}
                        <button
                            type="submit"
                        >
                            Envoyer
                        </button>
                    </Form>)}
                </Formik>
            </div>
        </div>

    )
}

export default AddForm
