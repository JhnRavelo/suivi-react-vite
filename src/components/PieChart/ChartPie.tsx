import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import "./chartPie.scss";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

type CharPieProps = {
    chartData: PieCharData
}

export type PieCharData = {
    name: string
    color: string
    value: number
}[] | undefined

const ChartPie = ({ chartData }: CharPieProps) => {
    const [total, setTotal] = useState(0)
    const { pathname } = useLocation()

    useEffect(() => {
        if (chartData) {
            let i = 0
            chartData.map(item => {
                i += item.value
            })
            setTotal(i)
        }
    }, [chartData])

    return (
        <div className="pieChartBox">
            <h1 style={pathname == "/admin" ? { marginBottom: "-15vh" } : {}}>Pourcentage Problème</h1>
            {chartData && <>
                <div className="chart">
                    <ResponsiveContainer width="99%" height={300}>
                        <PieChart>
                            <Tooltip
                                contentStyle={{ background: "white", borderRadius: "5px" }}
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
                <div className="options" style={pathname == "/admin" ? { height: "25vh", marginTop: "-15vh" } : { height: "15vh" }} >
                    <div className="scrollContent content">
                        {chartData.map((item, index) => {
                            return (
                                <div className="option" key={index}>
                                    <div className="title">
                                        <div className="dot" style={{ backgroundColor: item.color }} />
                                        <span>{item.name.split(" ").length > 1 ? `${item.name.split(" ")[0].length
                                            < item.name.split(" ")[1].length ? item.name.split(" ")[0]
                                            + " " + item.name.split(" ")[1][0].toUpperCase() + "." :
                                            item.name.split(" ")[0][0].toUpperCase() + ". " + item.name.split(" ")[1]}`
                                            : `${item.name}`}</span>
                                    </div>
                                    <span style={{ color: item.color }}>{total > 0 ? Math.floor((item.value / total) * 100) : null}%</span>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </>
            }
        </div>
    );
}

export default ChartPie
