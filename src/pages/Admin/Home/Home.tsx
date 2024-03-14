import { useEffect, useState } from "react"
import TopProduct from "../../../components/TopProduct/TopProduct"
import useHome from "../../../hooks/useHome"
import useHeader from "../../../hooks/useHeader"
import { StatProblems } from "../../../context/HomeContext"
import BigDataChart from "../../../components/BigDataChart/BigDataChart"
import getChartPerMonth from "../../../utils/getChartPerMonth"
import { BigCharDatas } from "../../../assets/ts/data"

const Home = () => {
  const homeContext = useHome()
  const headerContext = useHeader()
  const [topProblem, setTopProblem] = useState<StatProblems>()
  const [bigChartData, setBigChartData] = useState<BigCharDatas>()

  useEffect(() => {
      if (homeContext?.statTop && headerContext?.year) {
          const filterStatTopPerYear = homeContext.statTop.filter(item => item.year == headerContext?.year)
          setTopProblem(filterStatTopPerYear)
      }
  }, [homeContext?.statTop, headerContext?.year])

  useEffect(()=>{
    if(homeContext?.statSuivis && headerContext?.year){
      const filterStatSuivisPerYear = homeContext.statSuivis.filter(item => item.year == headerContext.year)
      const statSuivis = getChartPerMonth(filterStatSuivisPerYear)
      setBigChartData(statSuivis)
    }
  }, [homeContext?.statSuivis, headerContext?.year])

  return (
    <div className="home">
      <div className="box box1">
        <TopProduct topProblem={topProblem}/>
      </div>
      <div className="box box7">
        <BigDataChart chartData={bigChartData}/>
      </div>
      <div className="box box4">
        {/* <PieChartBox /> */}
      </div>
    </div>
  )
}

export default Home