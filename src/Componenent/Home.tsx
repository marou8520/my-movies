import React from "react";
import Header from "./Header";
import MoviesList from "./MoviesList";
import SearchBar from "./SearchBar";
import "../styles/Home.css";
import { useSelector, useDispatch } from "react-redux";
import { selectError, searchMovie, resetSearch } from "../redux/moviesSlice";

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
      <Header />
      {errorApi ? (
        <div>erreur</div>
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
