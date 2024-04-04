/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import useProduct from "./useProduct";
import useProductType from "./useProductType";
import { Data } from "../components/Form/Form";
import { Rows } from "../components/DataTable/DataTable";
import useUser from "./useUser";

const useRows = (type: Data) => {
  const productContext = useProduct();
  const productTypeContext = useProductType();
  const userContext = useUser();
  const [rows, setRows] = useState<Rows>();

  useEffect(() => {
    if (
      productContext?.products &&
      productTypeContext?.types &&
      userContext?.users
    ) {
      if (type == "products") {
        const productRows = productContext.products.map((product) => {
          const matchType = productTypeContext.types.find(
            (type) => type.id == product.productTypeId
          );
          const matchUser = userContext?.users.find(
            (user) => user.id == product.userProductId
          );
          if (matchType && matchUser) {
            return {
              ...product,
              type: matchType.name,
              tech: matchUser.name,
            };
          } else return product;
        });
        setRows(productRows);
      }
    }
  }, [
    type,
    productContext?.products,
    productTypeContext?.types,
    userContext?.users,
  ]);

  return rows;
};

export default useRows;
