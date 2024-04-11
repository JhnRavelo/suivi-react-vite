import { BigCharDatas } from "../../assets/ts/data";
import "./bigDataChart.scss";
import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis } from "recharts";

type BigChartDataProps = {
  chartData: BigCharDatas | undefined;
};

export type Payload = {
  datakey: string;
  payload: { name: string, color: string, id: number };
  value: number;
};

const CustomTooltip: React.FC<{ active?: boolean; payload?: Payload[] }> = ({
  active,
  payload,
}) => {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltipBig">
        {payload.map((item, index) => {
          return (
            <p key={index} className={`data ${item.datakey}`}>
              {`${item.payload.name}: ${item.value} Suivis`}
            </p>
          );
        })}
      </div>
    );
  } else {
    return null;
  }
};

const BigDataChart = ({ chartData }: BigChartDataProps) => {
  return (
    <div className="bigChartBox">
      <h1>Total Suivis</h1>
      <div className="chart">
        <ResponsiveContainer width="99%" height="100%">
          <BarChart data={chartData}>
            <Tooltip
              labelStyle={{ display: "none" }}
              cursor={{ fill: "none" }}
              content={<CustomTooltip />}
            />
            <XAxis dataKey="name" />
            <Bar dataKey="suivis" fill="#FF8042" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default BigDataChart;
