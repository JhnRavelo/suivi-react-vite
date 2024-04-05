import { useEffect, useState } from "react";
import TopProduct from "../../../components/TopProduct/TopProduct";
import useHome from "../../../hooks/useHome";
import useHeader from "../../../hooks/useHeader";
import { StatTops } from "../../../context/HomeContext";
import BigDataChart from "../../../components/BigDataChart/BigDataChart";
import getChartPerMonth from "../../../utils/getChartPerMonth";
import { BigCharDatas, dataHome } from "../../../assets/ts/data";
import ChartPie, { PieCharData } from "../../../components/PieChart/ChartPie";
import getPieChart from "../../../utils/getPieChart";
import useProductType from "../../../hooks/useProductType";
import getTop from "../../../utils/getTop";
import useProduct from "../../../hooks/useProduct";
import useProblem from "../../../hooks/useProblem";

const Home = () => {
  const homeContext = useHome();
  const headerContext = useHeader();
  const [topProblem, setTopProblem] = useState<StatTops>();
  const [bigChartData, setBigChartData] = useState<BigCharDatas>(dataHome);
  const [pieChartData, setPieChartData] = useState<PieCharData>();
  const productTypeContext = useProductType();
  const productContext = useProduct();
  const problemContext = useProblem();

  useEffect(() => {
    if (
      homeContext?.statTop &&
      headerContext?.year &&
      productTypeContext?.types &&
      productContext?.products &&
      problemContext?.problems
    ) {
      const filterStatTopPerYear = homeContext.statTop.filter(
        (item) => item.year == headerContext?.year
      );
      const statTops = getTop(
        filterStatTopPerYear,
        productTypeContext?.types,
        productContext?.products,
        problemContext.problems
      );
      setTopProblem(statTops);
    }
  }, [
    homeContext?.statTop,
    headerContext?.year,
    productTypeContext?.types,
    productContext?.products,
    problemContext?.problems,
  ]);

  useEffect(() => {
    if (homeContext?.statSuivis && headerContext?.year) {
      const filterStatSuivisPerYear = homeContext.statSuivis.filter(
        (item) => item.year == headerContext.year
      );
      const statSuivis = getChartPerMonth(
        filterStatSuivisPerYear,
        dataHome,
        "suivis"
      );
      setBigChartData(statSuivis);
    }
  }, [homeContext?.statSuivis, headerContext?.year]);

  useEffect(() => {
    if (
      homeContext?.statProductTypes &&
      headerContext?.year &&
      productTypeContext?.types
    ) {
      const filterStatProductTypesPerYear = homeContext.statProductTypes.filter(
        (item) => item.year == headerContext.year
      );
      const statProductTypes = getPieChart(
        filterStatProductTypesPerYear,
        productTypeContext?.types
      );
      setPieChartData(statProductTypes);
    }
  }, [
    homeContext?.statProductTypes,
    headerContext?.year,
    productTypeContext?.types,
  ]);

  return (
    <div className="home">
      <div className="box box1">
        <TopProduct topProblem={topProblem} />
      </div>
      <div className="box box7">
        <BigDataChart chartData={bigChartData} />
      </div>
      <div className="box box4">
        <ChartPie chartData={pieChartData} />
      </div>
    </div>
  );
};

export default Home;
