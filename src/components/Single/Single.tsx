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

type SingleProps = {
  item: Product | null;
  activities: Lists;
  chartData: SingleDatas;
  dataKeys: SingleDataKeys;
};

const Single = ({ item, chartData, dataKeys, activities }: SingleProps) => {
  return (
    <div className="single">
      <div className="view">
        <div className="info">
          <div className="topInfo">
            <h1>{item?.type}</h1>
          </div>
          <div className="details">
            <div className="item">
              <p>{item?.tech}</p>
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
                      <p>{activity.log}</p>
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
