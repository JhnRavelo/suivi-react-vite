import { InitialValuesProduct } from "../pages/Admin/Products/Products";
import { Dispatch, Edit } from "../components/Form/Form";
import { ProductType } from "../context/ProductTypeContext";
import { InitialValuesUser } from "../pages/Admin/Users/Users";
import { InitialValues } from "../components/Form/Form";
import { InitialValuesType } from "../pages/Admin/ProductTypes/ProductTypes";
import { Product, Products } from "../context/ProductContext";
import { Row, Rows } from "../components/DataTable/DataTable";
import { Suivi } from "../context/SuiviContext";
import { Problem } from "../context/ProblemContext";
import { InitialValuesProblem } from "../pages/Admin/Problems/Problems";
import { User } from "../context/UserContext";
import { StateBool } from "../context/HeaderContext";
import { InitialValuesProfile } from "../pages/Admin/Profile/Profile";

export function isInitialValuesType(
  obj: InitialValues
): obj is InitialValuesType {
  return obj && typeof obj === "object" && "pdf" in obj;
}

export function isInitialValuesUser(
  obj: InitialValues
): obj is InitialValuesUser {
  return obj && typeof obj === "object" && "email" in obj;
}

export function isInitialValuesProduct(
  obj: InitialValues
): obj is InitialValuesProduct {
  return obj && typeof obj === "object" && "type" in obj;
}

export function isInitialValuesProblem(
  obj: InitialValues
): obj is InitialValuesProblem {
  return obj && typeof obj === "object" && "name" in obj;
}

export function isInitialValuesProfile(
  obj: InitialValues
): obj is InitialValuesProfile {
  return obj && typeof obj === "object" && "avatar" in obj;
}

export function isProduct(obj: Edit): obj is Product {
  if (obj) {
    return obj && typeof obj === "object" && "client" in obj;
  } else {
    return false;
  }
}
export function isProducts(arr: Rows): arr is Products {
  if (Array.isArray(arr)) {
    return arr.every(
      (item) => typeof item === "object" && "client" in item
    );
  }
  return false;
}
export function isProductType(obj: Edit): obj is ProductType {
  if (obj) {
    return obj && typeof obj === "object" && "pdf" in obj;
  } else {
    return false;
  }
}

export function isProblem(obj: Edit): obj is Problem {
  if (obj) {
    return obj && typeof obj === "object" && "productTypeId" in obj;
  } else {
    return false;
  }
}

export function isSuivi(obj: Row): obj is Suivi {
  if (obj) {
    return obj && typeof obj === "object" && "problem" in obj;
  } else {
    return false;
  }
}

export function isUser(obj: Edit): obj is User {
  if (obj) {
    return obj && typeof obj === "object" && "email" in obj;
  }
  return false;
}

export function isStateBool(obj: Dispatch): obj is StateBool {
  if (obj && typeof obj === "function") {
    const hasCallOrApply =
      typeof obj.call === "function" || typeof obj.apply === "function";
    return hasCallOrApply;
  }
  return false;
}
