import "./topProduct.scss"
import { StatProblems } from "../../context/HomeContext"

type TopProductProps = {
    topProblem: StatProblems | undefined
}

const TopProduct = ({ topProblem }: TopProductProps) => {
    return (
        <div className="topBox">
            <h1>Problème fréquents</h1>
            <div className="list">
                <div className="scrollContent">
                    {topProblem && topProblem?.length > 0 && topProblem.map(item => {
                        const problems = item.problems?.map((item) => {
                            if (item?.problems) {
                                return `-${item.problems.name}: ${item.problemCount}fois`
                            } else return `-${item.problem}: 1fois`
                        })
                        return (
                            <div className="listItem" key={item.id} >
                                <div className="user">
                                    <div className="userTexts">
                                        <span className="productCategorie">{item.type}</span>
                                        <span className="email">Devis: {item.devis}</span>
                                        <span className="email">Client: {item.client}</span>
                                        <span className="email">Chantier: {item.chantier}</span>
                                        <div className="problemContainer">
                                            <span className="problemLabel">Problème</span>
                                            <div className="problemList">
                                                {problems &&
                                                    problems.map((item, index) => (
                                                        <span className="problem" key={index}>{item}</span>
                                                    ))
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="total">
                                    <span className="title">Total</span>
                                    <span className="amount">{item.productCount} fois</span>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default TopProduct