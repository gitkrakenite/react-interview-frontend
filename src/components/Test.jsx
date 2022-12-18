import React from "react";

// import redux dep
import { useSelector, useDispatch } from "react-redux";

const Test = () => {
  // get value in redux
  const { value } = useSelector((state) => state.counter);

  return <div>{value}</div>;
};

export default Test;
