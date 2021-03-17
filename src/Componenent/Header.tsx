import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  changeTheme,
  selectTheme
} from '../redux/themeSlice';
import '../styles/Header.css';
import Switch from "react-switch";

const Header: React.FC = () => {
    const lightTheme = useSelector(selectTheme);
    const dispatch = useDispatch();

    return <div className={`header ${lightTheme ? 'light-header' : 'dark-header'}`}>
        Films
        <div className="theme-button-container">
        <span className="material-icons md-18">dark_mode</span>
        <Switch onChange={() => dispatch(changeTheme())}
                checked={lightTheme}
                onColor='#fff'
                onHandleColor='#fff'
                handleDiameter={10}
                uncheckedIcon={false}
                checkedIcon={false}
                boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
                activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
                height={7}
                width={16}
                className="react-switch"
                id="material-switch"/>
        <span className="material-icons md-18">light_mode</span>
        </div>
    </div>
}

export default Header;