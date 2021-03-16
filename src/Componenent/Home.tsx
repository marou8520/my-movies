import React from 'react';
import Header from './Header';
import MoviesList from './MoviesList';
import SearchBar from './SearchBar';
import '../styles/Home.css';


const Home: React.FC = () => {
    return <div>
        <Header/>
        <div className="container">
            <SearchBar/>
            <MoviesList/>
        </div>
    </div>
}

export default Home;