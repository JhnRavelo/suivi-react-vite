import { StatTops } from "../context/HomeContext";
import { Problems } from "../context/ProblemContext";
import { Products } from "../context/ProductContext";
import { ProductTypes } from "../context/ProductTypeContext";

const getTop = (
  tops: StatTops,
  types: ProductTypes,
  products: Products,
  problems: Problems
) => {
  const statTops = tops.map((top) => {
    let currentTop = top;
    const matchType = types.find((type) => type.id == top.productTypeId);
    const matchProd = products.find((product) => product.id == top.id);
    const problemsArray = top.problems?.map((problem) => {
      const matchProb = problems.find((item) => item.id == problem.problemId);
      if (matchProb) {
        return `-${matchProb.name}: ${problem.problemCount}fois`;
      } else return `-${problem.problem}: 1fois`;
    });
    if (matchType) {
      currentTop = {
        ...currentTop,
        type: matchType.name,
      };
    }
    if (matchProd) {
      currentTop = {
        ...currentTop,
        client: matchProd.client,
        chantier: matchProd.chantier,
        devis: matchProd.devis,
      };
    }
    if (problemsArray) {
      currentTop = {
        ...currentTop,
        probArrStr: problemsArray,
      };
    }
    return currentTop;
  });
  return statTops;
};

export default getTop;
