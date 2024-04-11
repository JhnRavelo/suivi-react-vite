import {
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import "./single.scss";
import { Product } from "../../context/ProductContext";
import { Lists } from "../../hooks/useCreateLogs";
import { SingleDatas } from "../../assets/ts/data";
import { SingleDataKeys } from "../../pages/Admin/Product/Product";
import { useEffect, useState } from "react";

type SingleProps = {
  item: Product | null;
  activities: Lists;
  chartData: SingleDatas;
  dataKeys: SingleDataKeys;
};

type FrequentProblem = { name: string; count: number }

const Single = ({ item, chartData, dataKeys, activities }: SingleProps) => {
  const [frequentProblem, setFrequentProblem] = useState<FrequentProblem>();

  useEffect(() => {
    if (activities) {
      const productProblems: FrequentProblem[] = [];
      let problem = 0;
      activities.forEach((activity) => {
        const typeProblem = activity.problem.split(":")[0];
        const matchProblem = productProblems.find(
          (productProblem) => productProblem.name == typeProblem
        );
        if (matchProblem) {
          matchProblem.count++;
        } else {
          productProblems.push({ name: typeProblem, count: 1 });
        }
      });
      productProblems.forEach(productProblem => {
        if (productProblem.count >= problem) {
          setFrequentProblem(productProblem)
          problem = productProblem.count
        }
      })
    }
  }, [activities]);

  return (
    <div className="product">
      <div className="view">
        <div className="info">
          <div className="topInfo">
            <h1>Description</h1>
          </div>
          <div className="details">
            <div className="item">
              <p>
                Ce produit a été enregistré par {item?.tech} le{" "}
                {item?.createdAt.split(" ")[0]} à{" "}
                {item?.createdAt.split(" ")[1]} aux alentours de{" "}
                {item?.location}. Il a été créé pour le client <span>{item?.client}</span>{" "}
                comme stipulé dans le devis <span>{item?.devis}</span> du
                chantier <span>{item?.chantier}</span>
                . <br />
              </p>
              <div style={{ marginTop: "20px", }}>Problème fréquent : <span>{frequentProblem?.name} {frequentProblem?.count ? frequentProblem?.count + "fois" : ""}</span></div>
            </div>
          </div>
        </div>
        <hr />
        {chartData && (
          <div className="chart">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                width={500}
                height={300}
                data={chartData}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                {dataKeys.map((dataKey, index) => (
                  <Line
                    key={index}
                    type="monotone"
                    dataKey={dataKey.name}
                    stroke={dataKey.color}
                  />
                ))}
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>
      <div className="activities">
        <h2>Dernier activités</h2>
        {activities && (
          <ul>
            <div className="scrollContent">
              {activities.map((activity, index) => {
                const date = activity.createdAt.split(" ");
                const time = date[1].split(":");
                return (
                  <li key={index}>
                    <div>
                      <p>Technicien du suivi: {activity.log.split(" ")[0]}</p>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "10px",
                        paddingTop: "0px",
                      }}
                    >
                      <span style={{ color: "red" }}>
                        Problème -{activity.problem}
                      </span>
                      <span style={{ color: "green" }}>
                        Solution: {activity.solution}
                      </span>
                      <time>{`${date[0]} ${time[0]}:${time[1]}`}</time>
                    </div>
                  </li>
                );
              })}
            </div>
          </ul>
        )}
      </div>
    </div>
  );
};

export default Single;
