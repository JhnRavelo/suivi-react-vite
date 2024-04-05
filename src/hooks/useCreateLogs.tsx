/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import useLog from "./useLog";
import useHeader from "./useHeader";
import useUser from "./useUser";
import useProduct from "./useProduct";
import useProductType from "./useProductType";
import useProblem from "./useProblem";
import useGetProblem from "./useGetProblem";

export type Lists =
  | {
      log: string;
      problem: string;
      createdAt: string;
      solution: string;
    }[]
  | null;

const useCreateLogs = (id: number | string) => {
  const logContext = useLog();
  const headerContext = useHeader();
  const [lists, setLists] = useState<Lists | null>(null);
  const userContext = useUser();
  const productContext = useProduct();
  const productTypeContext = useProductType();
  const problemContext = useProblem();
  const getProblem = useGetProblem();

  useEffect(() => {
    if (logContext?.logs && headerContext?.year && problemContext?.problems) {
      let logPerId = logContext.logs;
      if (id != "-1") {
        logPerId = logContext.logs.filter((item) => item.productId == id);
      }
      const logPerYear = logPerId.filter(
        (item) => item.year == headerContext.year
      );
      const logs = logPerYear
        .map((log) => {
          const matchUser = userContext?.users.find(
            (item) => item.id == log.userId
          );
          const matchProduct = productContext?.products.find(
            (item) => item.id == log.productId
          );
          const matchProductType = productTypeContext?.types.find(
            (item) => item.id == log.productTypeId
          );
          const problem = getProblem(
            problemContext?.problems,
            log.problemId,
            log.problem
          );
          return {
            log: `${matchUser?.name} a effectué un suivi du produit ${matchProductType?.name} du devis ${matchProduct?.devis} associé au client ${matchProduct?.client}.`,
            problem: problem,
            solution: log.solution,
            createdAt: log.createdAt,
          };
        })
        .filter((item) => item !== undefined);
      setLists(logs);
    }
  }, [
    logContext?.logs,
    headerContext?.year,
    userContext?.users,
    productContext?.products,
    productTypeContext?.types,
    id,
    problemContext?.problems,
  ]);
  return lists;
};

export default useCreateLogs;
