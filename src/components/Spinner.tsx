import React from "react";
import { ClipLoader } from "react-spinners";

const override = {
  display: "block",
  margin: "100px auto",
};

const Spinner = () => {
  return <ClipLoader color="#92140c" cssOverride={override} size={150} />;
};

export default Spinner;
