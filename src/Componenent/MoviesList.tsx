import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchMovies,
  selectMovies,
  selectstatus,
  selectSearchedMovies,
} from "../redux/moviesSlice";
import { useHistory } from "react-router-dom";
import Card from "./Widgets/Card";
import "../styles/MoviesList.css";
import MovieNode from "../Constants/MovieNode";

const displayMovies = (
  movies: MovieNode[],
  showMovieDetailCallBack: (movieId: number) => void
) => {
  return (
    movies.length > 0 &&
    movies.map((movie: MovieNode) => {
      return (
        <Card
          key={movie.id}
          movie={movie}
          showMovieDetailCallBack={showMovieDetailCallBack}
        />
      );
    })
  );
};

const MoviesList: React.FC = () => {
  const dispatch = useDispatch();
  let history = useHistory();
  const searchedMovies = useSelector(selectSearchedMovies);
  const movies = useSelector(selectMovies);
  const postStatus = useSelector(selectstatus);

  const showMovieDetailCallBack = (movieId: number) => {
    history.push({
      pathname: "/movieDetail",
      state: { movieId: movieId },
    });
  };

  // Calling get popular movies from api when the componenet did the mount
  useEffect(() => {
    if (postStatus === "idle") {
      dispatch(fetchMovies());
    }
  }, [postStatus, dispatch]);

  return (
    <div className="movies-card-list">
      {!!searchedMovies
        ? displayMovies(searchedMovies, showMovieDetailCallBack)
        : displayMovies(movies, showMovieDetailCallBack)}
    </div>
  );
};

export default MoviesList;
