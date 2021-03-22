import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { changeTheme, selectTheme } from "../redux/themeSlice";
import "../styles/Header.css";
import Switch from "@material-ui/core/Switch";
import { useHistory, useLocation } from "react-router-dom";

const Header: React.FC = () => {
  const lightTheme = useSelector(selectTheme);
  const dispatch = useDispatch();
  let history = useHistory();
  let location = useLocation();

  return (
    <div className={`header ${lightTheme ? "light-header" : "dark-header"}`}>
      {location.pathname === "/movieDetail" && (
        <div className="back-button-container">
          <span
            className="material-icons md-18"
            onClick={() => history.goBack()}
          >
            arrow_back_ios
          </span>
        </div>
      )}
      <div>Films</div>
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
