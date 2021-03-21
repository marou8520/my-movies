import React, { useState } from "react";
import "../styles/SearchBar.css";

interface ToggleProps {
  searchMovie: (searchedMovie: string) => void;
  resetSearch: () => void;
}

const SearchBar: React.FC<ToggleProps> = (Props: ToggleProps) => {
  const [searchedMovie, setSearchedMovie] = useState<string>("");

  const handleKeyDown = (event: React.KeyboardEvent, searchedMovie: string) => {
    if (event.key === "Enter" && searchedMovie) {
      Props.searchMovie(searchedMovie);
    }
  };

  const handleChange = (searchedMovie: string) => {
    setSearchedMovie(searchedMovie);
    if (searchedMovie.length === 0) {
      Props.resetSearch();
    }
  };

  const clearSearchedMovies = () => {
    setSearchedMovie("");
    Props.resetSearch();
  };
  return (
    <div className="search-input-container">
      <input
        className="search-input"
        placeholder="Rechercher un film"
        type="text"
        value={searchedMovie}
        onChange={(e) => handleChange(e.target.value)}
        onKeyDown={(e) => handleKeyDown(e, searchedMovie)}
      />
      {}
      {searchedMovie.length > 0 && (
        <>
          <span
            className="material-icons md-18"
            onClick={() => Props.searchMovie(searchedMovie)}
          >
            search
          </span>
          <span
            className="material-icons md-18"
            onClick={() => clearSearchedMovies()}
          >
            close
          </span>
        </>
      )}
    </div>
  );
};

export default SearchBar;
