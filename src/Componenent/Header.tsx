import React, { useState } from 'react';
import '../styles/Header.css';
import { Colors } from '../Constants/Colors';
import Switch from "react-switch";

const Header: React.FC = () => {
     const useToggle = (initialValue: boolean) => {
        const [value, setValue] = useState(initialValue)
        const toggleValue = () => setValue(!value)
        return [value, toggleValue] as const
      }
      
    const [lightTheme, setLightTheme] = useToggle(true);

    return <div className="header" style={{backgroundColor: lightTheme ? Colors.blueLight: Colors.blueDark}}>
        Films
        <div className="theme-button-container">
        <Switch onChange={setLightTheme}
                checked={lightTheme}
                onColor='#fff'
                onHandleColor='#fff'
                handleDiameter={15}
                uncheckedIcon={false}
                checkedIcon={false}
                boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
                activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
                height={10}
                width={24}
                className="react-switch"
                id="material-switch"/>
        </div>
    </div>
}

export default Header;