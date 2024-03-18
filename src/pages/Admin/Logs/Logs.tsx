import { Fragment, useEffect, useRef, useState } from "react";
import "./logs.scss";
import useLog from "../../../hooks/useLog";
import useHeader from "../../../hooks/useHeader";
import { Logs } from "../../../context/LogContext";

const Log = () => {
    const logContext = useLog()
    const headerContext = useHeader()
    const [list, setList] = useState<Logs>();
    const logRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (logContext?.logs && headerContext?.year) {
            const logPerYear = logContext.logs.filter(item => item.year == headerContext.year)
            console.log(logPerYear)
            setList(logPerYear)
        }
        // logRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [logContext?.logs, headerContext?.year]);

    return (
        <>
            <h1 className="h1__journal">Journals</h1>
            <div className="log" ref={logRef}>
                <div className="scrollContent" style={{ paddingRight: "30px" }}>
                    {list && list.map((item, index) => {
                        console.log(item.createdAt.split(" ")[1])
                        const time = item.createdAt.split(" ")[1].split(":")
                        const date = item.createdAt.split(" ")[0]
                        return (
                            <Fragment key={index}>
                                <div className="journal" key={index}>
                                    <div className="log-event">
                                        <h2>{item.log}</h2>
                                        <h2 className="date">
                                            {date} à {`${time[0]}:${time[1]}`}
                                        </h2>
                                    </div>
                                    <div className="log-info">
                                        <h2>Problème -{item.problem}</h2>
                                        <h2>Solution: {item.solution}</h2>
                                    </div>
                                </div>
                            </Fragment>
                        );
                    })}
                </div>
            </div>
        </>
    );
};

export default Log;
