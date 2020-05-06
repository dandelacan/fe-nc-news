import React from "react";

const ErrorDisplayer = (props) => {
  const { msg } = props;
  return <h2>{msg || "path not found"}</h2>;
};

export default ErrorDisplayer;
