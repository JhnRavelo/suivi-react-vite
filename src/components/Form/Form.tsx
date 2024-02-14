import { ErrorMessage, Field, Form, Formik } from "formik";
import { Fragment, useEffect, useState } from "react";
import { ProductType } from "../../context/ProductTypeContext";
import { Colums } from "../DataTable/DataTable"
import { InitialValuesType } from "../../pages/Admin/ProductTypes/ProductTypes";
import * as Yup from "yup"
import "./form.scss"
import InputFile from "./InputFile";
import { User } from "../../context/UserContext";
import { InitialValuesUser } from "../../pages/Admin/Users/Users";
import { Product } from "../../context/ProductContext";
import { initialValuesProduct } from "../../pages/Admin/Products/Products";
import { isInitialValuesProduct, isInitialValuesType } from "../../utils/verificationType";
import InputCHeckBox from "./InputCheckBox";
import useProductType from "../../hooks/useProductType";
import useUser from "../../hooks/useUser";
import { Suivi } from "../../context/SuiviContext";

export type Edit = ProductType | null | User | Product | Suivi

export type InitialValues = InitialValuesType | InitialValuesUser | initialValuesProduct

type AddFormProps = {
    slug: string
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
    setEditRow: React.Dispatch<React.SetStateAction<Edit>>
    editRow: Edit
    columns: Colums
    initialValues: InitialValues
    validate: Yup.ObjectSchema<{
        name: string;
    }, Yup.AnyObject, {
        name: undefined;
    }, ""> | Yup.ObjectSchema<{
        type: (string | undefined)[] | undefined;
        dimension: string;
    }, Yup.AnyObject, {
        type: "";
        dimension: undefined;
    }, "">
    handleSubmit: (value: InitialValues) => void
}

const AddForm = ({ setOpen, setEditRow, slug, columns, validate, initialValues, editRow, handleSubmit }: AddFormProps) => {
    const [formTitle, setFormTitle] = useState<string | null>(null)
    const productTypeContext = useProductType()
    const userContext = useUser()

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

                    {({ setFieldValue, values }) => (<Form>
                        {columns
                            .filter(
                                (item) =>
                                    item.field !== "id" &&
                                    item.field !== "img" &&
                                    item.field !== "connected" &&
                                    item.field !== "createdAt"
                            )
                            .map((column, index) => {
                                if (column.field == "type") {
                                    return (
                                        <Fragment key={index}>
                                            <InputCHeckBox
                                                title="Le type de ménuiserie"
                                                name="type"
                                                arrays={productTypeContext?.checkboxTypes}
                                                type={(isInitialValuesProduct(values) && values.type) ? values.type : undefined}
                                            />
                                        </Fragment>
                                    )
                                } else if (column.field == "tech") {
                                    return (
                                        <Fragment key={index}>
                                            <InputCHeckBox
                                                title={column.placeholder}
                                                name="tech"
                                                arrays={userContext?.checkboxUser}
                                                type={isInitialValuesProduct(values) && values.tech ? values.tech : undefined} />
                                        </Fragment>
                                    )
                                }
                                else if (column.field == "pdf") {
                                    return (
                                        <div className="item" key={index}>
                                            <label>{column.headerName}</label>
                                            <InputFile
                                                name={column.field}
                                                setFieldValue={setFieldValue}
                                                value={isInitialValuesType(values) ? values : undefined}
                                            />
                                        </div>
                                    )
                                }

                                else {
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
                                }
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

