import React from 'react';
import '../styles/SearchBar.css';

const SearchBar: React.FC = () => {
    return <div className="search-input-container">
        <input type="text" className="search-input" placeholder="Rechercher un film"/>
    </div>
}

export default SearchBar;