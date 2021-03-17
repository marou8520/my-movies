import React from 'react';
import Header from './Header';
import MoviesList from './MoviesList';
import SearchBar from './SearchBar';
import '../styles/Home.css';
import {selectTheme} from '../redux/themeSlice';
import { useSelector } from 'react-redux';

const Home: React.FC = () => {
    const lightTheme = useSelector(selectTheme);
    return <div>
        <Header/>
        <div className={`container ${lightTheme ? 'light-background' : 'dark-background'}`}>
            <SearchBar/>
            <MoviesList/>
        </div>
    </div>
}

export default Home;