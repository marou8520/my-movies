import React from "react";
import { useLocation } from "react-router-dom";

const MovieDetail: React.FC = () => {
  const location = useLocation();
  console.log(location.state);
  return <div>movie detail</div>;
};

export default MovieDetail;
