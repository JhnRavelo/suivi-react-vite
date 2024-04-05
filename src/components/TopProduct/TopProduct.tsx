import { StatTops } from "../../context/HomeContext";
import "./topProduct.scss";

type TopProductProps = {
  topProblem: StatTops | undefined;
};

const TopProduct = ({ topProblem }: TopProductProps) => {
  return (
    <div className="topBox">
      <h1>Problème fréquents</h1>
      <div className="list">
        <div className="scrollContent">
          {topProblem &&
            topProblem?.length > 0 &&
            topProblem.map((item) => {
              return (
                <div className="listItem" key={item.id}>
                  <div className="user">
                    <div className="userTexts">
                      <span className="productCategorie">{item.type}</span>
                      <span className="email">Devis: {item.devis}</span>
                      <span className="email">Client: {item.client}</span>
                      <span className="email">Chantier: {item.chantier}</span>
                      <div className="problemContainer">
                        <span className="problemLabel">Problème</span>
                        <div className="problemList">
                          {item.probArrStr.length > 0 &&
                            item.probArrStr.map((item, index) => (
                              <span className="problem" key={index}>
                                {item}
                              </span>
                            ))}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="total">
                    <span className="title">Total</span>
                    <span className="amount">{item.productCount} fois</span>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default TopProduct;
