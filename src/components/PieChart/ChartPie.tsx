import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import "./chartPie.scss";
import { Fragment, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Payload } from "../BigDataChart/BigDataChart";
import { StatProblems } from "../../context/ProblemContext";
import useProblem from "../../hooks/useProblem";
import useHeader from "../../hooks/useHeader";

type CharPieProps = {
  chartData: PieCharData;
};

export type PieCharData =
  | {
      name: string;
      color: string;
      value: number;
    }[]
  | undefined;

const CustomTooltip: React.FC<{ active?: boolean; payload?: Payload[] }> = ({
  active,
  payload,
}) => {
  const [problemTypes, setProblemTypes] = useState<StatProblems>([]);
  const [otherCount, setOtherCount] = useState(0);
  const problemContext = useProblem();
  const headerContext = useHeader();

  useEffect(() => {
    if (
      problemContext?.statProblems &&
      payload &&
      payload.length &&
      headerContext?.year &&
      problemContext.problems
    ) {
      let count = 0;
      const filterProblemTypes = problemContext.statProblems.filter(
        (problem) =>
          problem.productTypeId == payload[0].payload.id &&
          problem.year == headerContext.year
      );
      const statProblemTypes = filterProblemTypes
        .map((filterProblemType) => {
          const matchStatProblem = problemContext.problems.find(
            (problem) => problem.id == filterProblemType.id
          );
          count += filterProblemType.count;
          if (matchStatProblem) {
            return {
              ...filterProblemType,
              name: matchStatProblem.name,
            };
          }
        })
        .filter((item) => item !== undefined);
      setOtherCount(payload[0].value - count);
      console.log("FilterProblem", count);
      setProblemTypes(statProblemTypes);
    }
  }, [
    problemContext?.statProblems,
    headerContext?.year,
    payload,
    problemContext?.problems,
  ]);

  if (active && payload && payload.length) {
    return (
      <div
        className="custom-tooltipPie"
        style={{ borderColor: payload[0].payload.color }}
      >
        {payload.map((item, index) => {
          return (
            <Fragment key={index}>
              <p style={{ width: "auto" }}>{`${item.payload.name}: `}</p>
              <div>
                {problemTypes.map((problemType, index) => (
                  <p key={index}>
                    -{problemType.name} {problemType.count} fois
                  </p>
                ))}
                {otherCount > 0 && <p>-autre problème {otherCount} fois</p>}
                <p>Total: {item.value}</p>
              </div>
            </Fragment>
          );
        })}
      </div>
    );
  } else {
    return null;
  }
};

const ChartPie = ({ chartData }: CharPieProps) => {
  const [total, setTotal] = useState(0);
  const { pathname } = useLocation();

  useEffect(() => {
    if (chartData) {
      let i = 0;
      chartData.map((item) => {
        i += item.value;
      });
      setTotal(i);
    }
  }, [chartData]);

  return (
    <div className="pieChartBox">
      <h1 style={pathname == "/admin" ? { marginBottom: "-15vh" } : {}}>
        Pourcentage Problème
      </h1>
      {chartData && (
        <>
          <div className="chart">
            <ResponsiveContainer width="99%" height={300}>
              <PieChart>
                <Tooltip
                  contentStyle={{ background: "white", borderRadius: "5px" }}
                  content={pathname == "/admin" ? <CustomTooltip /> : undefined}
                />
                <Pie
                  data={chartData}
                  innerRadius={"70%"}
                  outerRadius={"90%"}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {chartData.map((item, index) => (
                    <Cell key={index} fill={item.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div
            className="options"
            style={
              pathname == "/admin"
                ? { height: "25vh", marginTop: "-15vh" }
                : { height: "15vh" }
            }
          >
            <div className="scrollContent content">
              {chartData.map((item, index) => {
                return (
                  <div className="option" key={index}>
                    <div className="title">
                      <div
                        className="dot"
                        style={{ backgroundColor: item.color }}
                      />
                      <span>
                        {item.name.split(" ").length > 1
                          ? `${
                              item.name.split(" ")[0].length <
                              item.name.split(" ")[1].length
                                ? item.name.split(" ")[0] +
                                  " " +
                                  item.name.split(" ")[1][0].toUpperCase() +
                                  "."
                                : item.name.split(" ")[0][0].toUpperCase() +
                                  ". " +
                                  item.name.split(" ")[1]
                            }`
                          : `${item.name}`}
                      </span>
                    </div>
                    <span style={{ color: item.color }}>
                      {total > 0
                        ? Math.floor((item.value / total) * 100)
                        : null}
                      %
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ChartPie;
