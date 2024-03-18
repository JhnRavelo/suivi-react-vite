import { StatProductTypes } from "../context/HomeContext"
import { StatProblems } from "../context/ProblemContext"
import generateColor from "./generateColor"

const getPieChart = (value: StatProblems | StatProductTypes) => {
    if (value) {
        const chartDataProblem = value.map(item => {
            const color = generateColor()
            return {
                name: item.name,
                value: item.count,
                color: color
            }
        })
        return chartDataProblem
    }
}

export default getPieChart