import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { changeTheme, selectTheme } from "../redux/themeSlice";
import "../styles/Header.css";
import Switch from "@material-ui/core/Switch";

const Header: React.FC = () => {
  const lightTheme = useSelector(selectTheme);
  const dispatch = useDispatch();

  return (
    <div className={`header ${lightTheme ? "light-header" : "dark-header"}`}>
      Films
      <div className="theme-button-container">
        <span
          className="material-icons md-18"
          onClick={() => dispatch(changeTheme())}
        >
          dark_mode
        </span>
        <Switch
          onChange={() => dispatch(changeTheme())}
          checked={lightTheme}
          color="default"
          size="small"
          className="react-switch"
        />
        <span
          className="material-icons md-18"
          onClick={() => dispatch(changeTheme())}
        >
          light_mode
        </span>
      </div>
    </div>
  );
};

export default Header;
