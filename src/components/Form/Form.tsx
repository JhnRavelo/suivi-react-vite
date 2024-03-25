import { ErrorMessage, Field, Form, Formik } from "formik";
import { Fragment, useEffect, useState } from "react";
import { ProductType, ProductTypes } from "../../context/ProductTypeContext";
import { Colums } from "../DataTable/DataTable";
import { InitialValuesType } from "../../pages/Admin/ProductTypes/ProductTypes";
import * as Yup from "yup";
import "./form.scss";
import InputFile from "./InputFile";
import { User, Users } from "../../context/UserContext";
import { InitialValuesUser } from "../../pages/Admin/Users/Users";
import { Product } from "../../context/ProductContext";
import { initialValuesProduct } from "../../pages/Admin/Products/Products";
import {
    isInitialValuesProduct,
    isInitialValuesType,
} from "../../utils/verificationType";
import InputCHeckBox from "./InputCheckBox";
import useProductType from "../../hooks/useProductType";
import useUser from "../../hooks/useUser";
import { Suivi, Suivis } from "../../context/SuiviContext";
import { Problem, Problems } from "../../context/ProblemContext";
import useExtractId from "../../hooks/useExtractId";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import useCheckBox from "../../hooks/useCheckBox";
import { Saves } from "../../context/SaveContext";
import { StateBool } from "../../context/HeaderContext";

export type Edit = ProductType | null | User | Product | Suivi | Problem;

export type InitialValues =
    | InitialValuesType
    | InitialValuesUser
    | initialValuesProduct;

type AddFormProps = {
    slug: string;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    setEditRow: React.Dispatch<React.SetStateAction<Edit>>;
    editRow: Edit;
    columns: Colums;
    initialValues: InitialValues;
    validate:
    | Yup.ObjectSchema<
        {
            name: string;
        },
        Yup.AnyObject,
        {
            name: undefined;
        },
        ""
    >
    | Yup.ObjectSchema<
        {
            type: (string | undefined)[] | undefined;
            dimension: string;
        },
        Yup.AnyObject,
        {
            type: "";
            dimension: undefined;
        },
        ""
    >;
    setState: Dispatch;
    url: URL;
    data: Data;
    setCheckbox?: CheckBox;
};

export type Data =
    | "users"
    | "products"
    | "types"
    | "problems"
    | "suivis"
    | "files";

export type URL =
    | "/auth/user"
    | "/product"
    | "/productType"
    | "/problem"
    | "/suivi/delete"
    | "/data/delete/export"
    | "/data/restore/export";

export type Dispatch =
    | React.Dispatch<React.SetStateAction<Users>>
    | undefined
    | React.Dispatch<React.SetStateAction<ProductTypes>>
    | React.Dispatch<React.SetStateAction<Problems>>
    | React.Dispatch<React.SetStateAction<Suivis>> 
    | React.Dispatch<React.SetStateAction<Saves>>
    | StateBool

export type CheckBox = React.Dispatch<React.SetStateAction<string | null>>;

const AddForm = ({
    setOpen,
    setEditRow,
    slug,
    columns,
    validate,
    initialValues,
    editRow,
    setState,
    url,
    data,
    setCheckbox,
}: AddFormProps) => {
    const [formTitle, setFormTitle] = useState<string | null>(null);
    const productTypeContext = useProductType();
    const userContext = useUser();
    const extract = useExtractId();
    const axiosPrivate = useAxiosPrivate();
    const checkBox = useCheckBox();

    useEffect(() => {
        (() => {
            if (editRow) {
                setFormTitle("Modifier le");
            } else {
                setFormTitle("Ajouter un nouveau");
            }
        })();
    }, [editRow, initialValues]);

    const handleSubmit = async (values: InitialValues) => {
        const entries = Object.entries(values);
        const formData = new FormData();

        entries.forEach(([key, value]) => {
            if ((key == "tech" || key == "type") && isInitialValuesProduct(values)) {
                const compare = values[key] ? values[key] : null;
                if (compare) {
                    const id = extract(compare[0], key);
                    formData.append(key, `${id}`);
                }
            } else formData.append(key, value);
        });
        if (editRow) {
            formData.append("id", editRow.id.toString());
            let res;

            if (slug == "type") {
                res = await axiosPrivate.put(url, formData, {
                    headers: { "Content-Type": "multipart/form-data" },
                });
            } else res = await axiosPrivate.put(url, formData);

            if (res.data.success && setState) {
                setState(res.data[data]);
                checkBox(setCheckbox, res.data[data]);
                setEditRow(null);
                setOpen(false);
            }
        } else {
            let res;
            if (slug == "type") {
                res = await axiosPrivate.post(url, formData, {
                    headers: { "Content-Type": "multipart/form-data" },
                });
            } else res = await axiosPrivate.post(url, formData);

            if (res.data.success && setState) {
                setState(res.data[data]);
                checkBox(setCheckbox, res.data[data]);
                setOpen(false);
            }
        }
    };

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
                    {({ setFieldValue, values }) => (
                        <Form>
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
                                                    type={
                                                        isInitialValuesProduct(values) && values.type
                                                            ? values.type
                                                            : undefined
                                                    }
                                                />
                                            </Fragment>
                                        );
                                    } else if (column.field == "tech") {
                                        return (
                                            <Fragment key={index}>
                                                <InputCHeckBox
                                                    title={column.placeholder}
                                                    name="tech"
                                                    arrays={userContext?.checkboxUser}
                                                    type={
                                                        isInitialValuesProduct(values) && values.tech
                                                            ? values.tech
                                                            : undefined
                                                    }
                                                />
                                            </Fragment>
                                        );
                                    } else if (column.field == "pdf") {
                                        return (
                                            <div className="item" key={index}>
                                                <label>{column.headerName}</label>
                                                <InputFile
                                                    name={column.field}
                                                    setFieldValue={setFieldValue}
                                                    value={
                                                        isInitialValuesType(values) ? values : undefined
                                                    }
                                                />
                                            </div>
                                        );
                                    } else {
                                        return (
                                            <div
                                                className="item"
                                                key={index}
                                                style={slug == "problème" ? { width: "100%" } : {}}
                                            >
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
                                        );
                                    }
                                })}
                            <button type="submit">Envoyer</button>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
};

export default AddForm;
