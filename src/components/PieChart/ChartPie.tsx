import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import "./chartPie.scss";

type CharPieProps = {
    chartData: CharData[]
}

interface CharData {
    name: string
    color: string
    value: number
}

const ChartPie = ({ chartData }: CharPieProps) => {
    return (
        <div className="pieChartBox">
            <h1>Pourcentage Problème</h1>
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
                            {chartData.map((item) => (
                                <Cell key={item.name} fill={item.color} />
                            ))}
                        </Pie>
                    </PieChart>
                </ResponsiveContainer>
            </div>
            <div className="options">
                {chartData.map((item) => (
                    <div className="option" key={item.name}>
                        <div className="title">
                            <div className="dot" style={{ backgroundColor: item.color }} />
                            <span>{item.name.split(" ").length > 1 ? `${item.name.split(" ")[0][0]}. ${item.name.split(" ")[1]}` : `${item.name.split(" ")[0]}`}</span>
                        </div>
                        <span>{item.value}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ChartPie
