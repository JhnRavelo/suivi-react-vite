import { BigCharDatas, SingleDatas } from "../assets/ts/data";
import { StatSuivis } from "../context/HomeContext";
import { StatProducts } from "../context/ProductContext";

export type Stats = StatSuivis | StatProducts

export type ChartDatasAssets = BigCharDatas | SingleDatas 

const getChartPerMonth = (
  stats: Stats,
  data: ChartDatasAssets,
  keyName: "suivis" | "total_suivis" | "suivis_produits"
) => {
  const newState = data.map((prev) => {
    const matchingNb = stats.find((nb) => nb.month == prev.number);

    if (matchingNb) {
      return { ...prev, [keyName]: matchingNb.count };
    } else {
      return prev;
    }
  });

  return newState;
};

export default getChartPerMonth;
