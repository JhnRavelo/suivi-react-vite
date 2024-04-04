import { useParams } from "react-router-dom";
import Single from "../../../components/Single/Single";
import useCreateLogs from "../../../hooks/useCreateLogs";
import { useEffect, useState } from "react";
import useProduct from "../../../hooks/useProduct";
import { Product } from "../../../context/ProductContext";
import { dataSingles } from "../../../assets/ts/data";
import useHome from "../../../hooks/useHome";
import useHeader from "../../../hooks/useHeader";
import getChartPerMonth from "../../../utils/getChartPerMonth";

export type SingleDataKeys = {
  name: string;
  color: string;
}[];

const dataKeys: SingleDataKeys = [
  {
    name: "total_suivis",
    color: "rebeccapurple",
  },
  {
    name: "suivis_produits",
    color: "greenyellow",
  },
];

const ProductSingle = () => {
  const { id } = useParams();
  const lists = useCreateLogs(id ? id : "");
  const productContext = useProduct();
  const homeContext = useHome();
  const headerContext = useHeader();
  const [product, setProduct] = useState<Product | null>(null);
  const [charData, setChartData] = useState(dataSingles);

  useEffect(() => {
    if (
      productContext?.products &&
      id &&
      homeContext?.statSuivis &&
      headerContext?.year &&
      productContext.statProducts
    ) {
      const currentProduct = productContext.products.find(
        (item) => item.id.toString() == id
      );
      if (currentProduct) {
        setProduct(currentProduct);
      }
      const statSuivisPerYear = homeContext.statSuivis.filter(
        (item) => item.year == headerContext.year
      );
      const statProductsPerYear = productContext.statProducts.filter(
        (item) => item.year == headerContext.year && item.productId.toString() == id
      );
      const chartDataSuivis = getChartPerMonth(
        statSuivisPerYear,
        dataSingles,
        "total_suivis"
      );
      const chartDataSuivisAndProducts = getChartPerMonth(
        statProductsPerYear,
        chartDataSuivis,
        "suivis_produits"
      );
      setChartData(chartDataSuivisAndProducts);
    }
  }, [
    id,
    productContext?.products,
    homeContext?.statSuivis,
    headerContext?.year,
    productContext?.statProducts,
  ]);

  return (
    <Single
      activities={lists}
      dataKeys={dataKeys}
      item={product}
      chartData={charData}
    />
  );
};

export default ProductSingle;
