import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchMovies,
  selectMovies,
  selectstatus,
  selectSearchedMovies,
} from "../redux/moviesSlice";
import { Tooltip, Typography } from "@material-ui/core";
import { withStyles, Theme } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";
import without_poster from "../assets/without_poster.png";
import { imageServerUri } from "../Constants/ServerInfo";
import "../styles/MoviesList.css";

interface MovieNode {
  title: string;
  id: number;
  backdrop_path: string;
  poster_path: string;
}

const MoviesList: React.FC = () => {
  const dispatch = useDispatch();
  let history = useHistory();
  const searchedMovies = useSelector(selectSearchedMovies);
  const movies = useSelector(selectMovies);
  const postStatus = useSelector(selectstatus);

  useEffect(() => {
    if (postStatus === "idle") {
      dispatch(fetchMovies());
    }
  }, [postStatus, dispatch]);

  const HtmlTooltip = withStyles((theme: Theme) => ({
    tooltip: {
      backgroundColor: "#f5f5f9",
      color: "rgba(0, 0, 0, 0.87)",
      maxWidth: 220,
      fontSize: theme.typography.pxToRem(12),
      border: "1px solid #dadde9",
    },
  }))(Tooltip);

  const displayMovies = (movies: MovieNode[]) => {
    return (
      movies.length > 0 &&
      movies.map((movie: MovieNode) => {
        return (
          <HtmlTooltip
            title={<Typography color="inherit">{movie.title}</Typography>}
            key={movie.id}
            className="movie-card"
          >
            {movie.poster_path ? (
              <img
                className="movie-card-poster"
                src={imageServerUri + movie.poster_path}
                alt=""
                onClick={(e) => {
                  history.push({
                    pathname: "/movieDetail",
                    state: { movieId: movie.id },
                  });
                }}
              />
            ) : (
              <img
                className="movie-card-poster without-poster"
                src={without_poster}
                alt=""
                onClick={(e) => {
                  history.push({
                    pathname: "/movieDetail",
                    state: { movieId: movie.id },
                  });
                }}
              />
            )}
          </HtmlTooltip>
        );
      })
    );
  };
  return (
    <div className="movies-card-list">
      {!!searchedMovies ? displayMovies(searchedMovies) : displayMovies(movies)}
    </div>
  );
};

export default MoviesList;
