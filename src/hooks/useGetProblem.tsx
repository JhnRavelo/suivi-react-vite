import { Problems } from "../context/ProblemContext";

const useGetProblem = () => {
  const getProblem = (
    problems: Problems,
    probemId: number,
    problemName: string
  ) => {
    let problemType = "",
      problem = "";
    const matchProblem = problems.find((problem) => problem.id == probemId);
    if (matchProblem && problemName) {
      problemType = `${matchProblem?.name}: `;
    } else if (matchProblem && !problemName) {
      problemType = matchProblem?.name;
    }

    if (problemName) {
      problem = problemName;
    }
    return problemType + problem;
  };
  return getProblem;
};

export default useGetProblem;
