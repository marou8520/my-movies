import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { changeTheme, selectTheme } from "../redux/themeSlice";
import Switch from "@material-ui/core/Switch";
import { useHistory, useLocation } from "react-router-dom";
import "../styles/Header.css";
import styled from "styled-components";
import strings from "../Constants/Strings";

interface HeaderContainerProps {
  readonly lightTheme: boolean;
}

const HeaderContainer = styled.div<HeaderContainerProps>`
  background-color: ${(props) =>
    props.lightTheme
      ? props.theme.headerColors.light
      : props.theme.headerColors.dark};
`;

const Header: React.FC = () => {
  const dispatch = useDispatch();
  let history = useHistory();
  let location = useLocation();
  const lightTheme = useSelector(selectTheme);

  return (
    <HeaderContainer className="header" lightTheme={lightTheme}>
      {/* Show back button if path name is equal to movieDetail */}
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
      <div>{strings.headerTitle}</div>

      {/* Header right buttons */}
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
    </HeaderContainer>
  );
};

export default Header;
