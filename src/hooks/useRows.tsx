/* eslint-disable react-hooks/exhaustive-deps */
import { Rows } from "../components/DataTable/DataTable";
import { useEffect, useState } from "react";
import useProduct from "./useProduct";
import useUser from "./useUser";
import useProductType from "./useProductType";
import { Data } from "../components/Form/Form";

const useRows = (type: Data) => {
  const [rows, setRows] = useState<Rows>();
  const productContext = useProduct();
  const userContext = useUser();
  const productTypeContext = useProductType();

  useEffect(() => {
    if (
      productTypeContext?.types &&
      userContext?.users &&
      productContext?.products
    ) {
      if (type == "products") {
        const productRows = productContext?.products.map((product) => {
          const matchType = productTypeContext?.types.find(
            (type) => type.id == product.productTypeId
          );
          const matchUser = userContext?.users.find(
            (user) => user.id == product.userProductId
          );
          let currentProduct = product
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
      }
    }
  }, [userContext?.users, productTypeContext?.types, productContext?.products]);

  return rows;
};

export default useRows;
