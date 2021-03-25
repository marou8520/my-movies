import React, { useState } from "react";
import { selectTheme } from "../redux/themeSlice";
import { useSelector } from "react-redux";
import "../styles/SearchBar.css";
import styled from "styled-components";

interface SearchButtonProps {
  readonly lightTheme: boolean;
}

const SearchButton = styled.div<SearchButtonProps>`
  background-color: ${(props) =>
    props.lightTheme
      ? props.theme.headerColors.light
      : props.theme.headerColors.dark};
`;

interface ToggleProps {
  searchMovie: (searchedMovie: string) => void;
  resetSearch: () => void;
}

const SearchBar: React.FC<ToggleProps> = (Props: ToggleProps) => {
  const [searchedMovie, setSearchedMovie] = useState<string>("");
  const lightTheme = useSelector(selectTheme);

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
      {searchedMovie.length > 0 && (
        <div className="buttons-container">
          <span
            className="material-icons md-18"
            onClick={() => clearSearchedMovies()}
          >
            close
          </span>
          <SearchButton
            lightTheme={lightTheme}
            onClick={() => Props.searchMovie(searchedMovie)}
            className="search-button"
          >
            Search
          </SearchButton>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
