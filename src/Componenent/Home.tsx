import React from "react";
import MoviesList from "./MoviesList";
import SearchBar from "./SearchBar";
import ErrorPanel from "./ErrorPanel";
import { useSelector, useDispatch } from "react-redux";
import { selectError, searchMovie, resetSearch } from "../redux/moviesSlice";
import "../styles/Home.css";

const Home: React.FC = () => {
  const errorApi = useSelector(selectError);
  const dispatch = useDispatch();
  const searchMovieCallBack = (searchedMovie: string) => {
    dispatch(searchMovie(searchedMovie));
  };
  const resetSearchCallBack = () => {
    dispatch(resetSearch());
  };
  return (
    <div>
      {errorApi ? (
        <ErrorPanel />
      ) : (
        <div className="container">
          <SearchBar
            searchMovie={searchMovieCallBack}
            resetSearch={resetSearchCallBack}
          />
          <MoviesList />
        </div>
      )}
    </div>
  );
};

export default Home;
