import { Fragment } from "react";
import { Lists } from "../../hooks/useCreateLogs";

type JournalProps = {
    list: Lists | null
}

const Journal = ({list}: JournalProps) => {
  return (
    <>
      <h1 className="h1__journal">Journals</h1>
      <div className="log">
        <div className="scrollContent" style={{ paddingRight: "30px" }}>
          {list &&
            list.map((item, index) => {
              const time = item.createdAt.split(" ")[1].split(":");
              const date = item.createdAt.split(" ")[0];
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
                      <h2 style={{color: "red"}}>Problème -{item.problem}</h2>
                      <h2 style={{color: "greenyellow"}}>Solution: {item.solution}</h2>
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

export default Journal;
