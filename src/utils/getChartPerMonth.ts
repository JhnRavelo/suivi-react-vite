import { dataHome } from "../assets/ts/data"
import { StatSuivis } from "../context/HomeContext";

const getChartPerMonth = (nbUser: StatSuivis) => {
    const newState = dataHome.map((prev) => {
        const matchingNb = nbUser.find((nb) => nb.month == prev.number);

        if (matchingNb) {
            return { ...prev, suivis: matchingNb.suiviCount };
        } else {
            return prev;
        }
    });

    return newState;
};

export default getChartPerMonth;