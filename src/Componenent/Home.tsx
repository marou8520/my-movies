import React from 'react';
import Header from './Header';
import MoviesList from './MoviesList';
import SearchBar from './SearchBar';
import '../styles/Home.css';
import {selectTheme} from '../redux/themeSlice';
import { useSelector } from 'react-redux';
import {
     selectError
  } from '../redux/moviesSlice';

const Home: React.FC = () => {
    const lightTheme = useSelector(selectTheme);
    const errorApi = useSelector(selectError);
    return <div>
        <Header/>
        {errorApi ? <div>erreur</div>
        :<div className={`container ${lightTheme ? 'light-background' : 'dark-background'}`}>
            <SearchBar/>
            <MoviesList/>
        </div>
        }

    </div>
}

export default Home;