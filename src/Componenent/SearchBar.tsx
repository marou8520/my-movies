import React, { useState } from "react";
import { selectTheme } from "../redux/themeSlice";
import { useSelector } from "react-redux";
import "../styles/SearchBar.css";
import styled from "styled-components";
import strings from "../Constants/Strings";

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

  // Call the search movies api when the user hit enter button
  const handleKeyDown = (event: React.KeyboardEvent, searchedMovie: string) => {
    if (event.key === "Enter" && searchedMovie) {
      Props.searchMovie(searchedMovie);
    }
  };

  // Handling the search input change + if the user clear the input then show the popular movies
  const handleChange = (searchedMovie: string) => {
    setSearchedMovie(searchedMovie);
    if (!searchedMovie) {
      Props.resetSearch();
    }
  };

  // Clear the searched movie input and reset the searched movies data
  const clearSearchedMovies = () => {
    setSearchedMovie("");
    Props.resetSearch();
  };

  return (
    <div className="search-input-container">
      <input
        className="search-input"
        placeholder={strings.searchBarPlaceHolder}
        type="text"
        value={searchedMovie}
        onChange={(e) => handleChange(e.target.value)}
        onKeyDown={(e) => handleKeyDown(e, searchedMovie)}
      />
      {/* If the search input is not empty then show the clear text icon and the search button */}
      {!!searchedMovie && (
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
            {strings.searchButtonValue}
          </SearchButton>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
