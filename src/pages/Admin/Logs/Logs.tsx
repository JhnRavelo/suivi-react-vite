import "./logs.scss";
import Journal from "../../../components/Journal/Journal";
import useCreateLogs from "../../../hooks/useCreateLogs";

const Log = () => {
    const lists = useCreateLogs("-1")

    return <Journal list={lists} />;
};

export default Log;
