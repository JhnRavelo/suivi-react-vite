import { initialValuesProduct } from "../pages/Admin/Products/Products";
import { Edit } from "../components/Form/Form";
import { ProductType } from "../context/ProductTypeContext";
import { InitialValuesUser } from "../pages/Admin/Users/Users";
import { InitialValues } from "../components/Form/Form";
import { InitialValuesType } from "../pages/Admin/ProductTypes/ProductTypes";
import { Product } from "../context/ProductContext";

export function isProductType(obj: Edit): obj is ProductType {
    if (obj) {
        return obj && typeof obj === 'object' && 'pdf' in obj;
    } else {
        return false
    }
}

export function isInitialValuesType(obj: InitialValues): obj is InitialValuesType {
    return obj && typeof obj === 'object' && 'pdf' in obj;
}

export function isInitialValuesUser(obj: InitialValues): obj is InitialValuesUser {
    return obj && typeof obj === 'object' && 'email' in obj;
}

export function isInitialValuesProduct(obj: InitialValues): obj is initialValuesProduct {
    return obj && typeof obj === 'object' && 'type' in obj;
}

export function isProduct(obj: Edit): obj is Product {
    if (obj) {
        return obj && typeof obj === "object" && 'type' in obj;
    } else {
        return false
    }
}



