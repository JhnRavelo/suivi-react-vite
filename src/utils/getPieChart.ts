import { StatProductTypes } from "../context/HomeContext"
import { Problems, StatProblems } from "../context/ProblemContext"
import { ProductTypes } from "../context/ProductTypeContext"
import generateColor from "./generateColor"

const getPieChart = (values: StatProblems | StatProductTypes, datas: Problems | ProductTypes) => {
    if (values) {
        const chartDataProblem = values.map(item => {
            const color = generateColor()
            const match = datas.find(data => data.id == item.id)
            if (match) {
                return {
                    name: match.name,
                    value: item.count,
                    color: color
                }
            } else return {
                name: "autre",
                color: color,
                value: item.count
            }
        })
        return chartDataProblem
    }
}

export default getPieChart