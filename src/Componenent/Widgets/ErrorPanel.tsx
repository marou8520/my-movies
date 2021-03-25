import React from "react";
import "../../styles/widgets/ErrorPanel.css";
import strings from "../../Constants/Strings";

const SearchBar = () => {
  return <div className="api-error">{strings.apiErrorMessage}</div>;
};

export default SearchBar;
