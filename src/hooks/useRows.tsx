/* eslint-disable react-hooks/exhaustive-deps */
import { Rows } from "../components/DataTable/DataTable";
import { useEffect, useState } from "react";
import useProduct from "./useProduct";
import useUser from "./useUser";
import useProductType from "./useProductType";
import { Data } from "../components/Form/Form";
import useSuvi from "./useSuvi";
import useProblem from "./useProblem";
import useGetProblem from "./useGetProblem";

const useRows = (type: Data) => {
  const [rows, setRows] = useState<Rows>();
  const productContext = useProduct();
  const userContext = useUser();
  const productTypeContext = useProductType();
  const suiviContext = useSuvi();
  const ProblemContext = useProblem();
  const getProblem = useGetProblem()

  useEffect(() => {
    if (
      productTypeContext?.types &&
      userContext?.users &&
      productContext?.products
    ) {
      if (type === "products") {
        const productRows = productContext?.products.map((product) => {
          const matchType = productTypeContext?.types.find(
            (type) => type.id == product.productTypeId
          );
          const matchUser = userContext?.users.find(
            (user) => user.id == product.userProductId
          );
          let currentProduct = product;
          if (matchType) {
            currentProduct = {
              ...currentProduct,
              type: matchType.name,
            };
          }
          if (matchUser) {
            currentProduct = {
              ...currentProduct,
              tech: matchUser.name,
            };
          }
          return currentProduct;
        });
        setRows(productRows);
      } else if (
        type === "suivis" &&
        suiviContext?.suivis &&
        ProblemContext?.problems
      ) {
        const suiviRows = suiviContext.suivis.map((suivi) => {
          let currentSuivi = suivi;
          const matchProduct = productContext.products.find(
            (product) => product.id == suivi.productId
          );
          const matchUser = userContext.users.find(
            (user) => user.id == suivi.userId
          );
          const matchType = productTypeContext.types.find(
            (type) => type.id == suivi.productTypeId
          );
          if (matchProduct) {
            currentSuivi = {
              ...currentSuivi,
              client: matchProduct.client,
              chantier: matchProduct.chantier,
              devis: matchProduct.devis,
            };
          }
          if (matchUser) {
            currentSuivi = {
              ...currentSuivi,
              tech: matchUser.name,
            };
          }
          if (matchType) {
            currentSuivi = {
              ...currentSuivi,
              type: matchType.name,
            };
          }
          const problem = getProblem(
            ProblemContext.problems,
            suivi.problemId,
            suivi.problem
          );
          currentSuivi = {
            ...currentSuivi,
            problem: problem,
          };
          return currentSuivi;
        });
        setRows(suiviRows);
      }
    }
  }, [
    userContext?.users,
    productTypeContext?.types,
    productContext?.products,
    suiviContext?.suivis,
    ProblemContext?.problems,
  ]);

  return rows;
};

export default useRows;
