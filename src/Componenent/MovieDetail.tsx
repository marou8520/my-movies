import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getMovieDetail,
  selectstatus,
  selectMovie,
  resetMovieDetail,
  selectMovieDetailError,
} from "../redux/movieDetailSlice";
import { selectTheme } from "../redux/themeSlice";
import { useLocation } from "react-router-dom";
import { imageServerUri } from "../Constants/ServerInfo";
import "../styles/MovieDetail.css";
import ErrorPanel from "./ErrorPanel";

interface LocationState {
  movieId: number;
}

const MovieDetail: React.FC = () => {
  const dispatch = useDispatch();
  const location = useLocation<LocationState>();
  const movie = useSelector(selectMovie);
  const postStatus = useSelector(selectstatus);
  const lightTheme = useSelector(selectTheme);
  const movieDetailErrorApi = useSelector(selectMovieDetailError);

  const { movieId } = location.state;
  useEffect(() => {
    return () => {
      dispatch(resetMovieDetail());
    };
  }, [dispatch]);

  useEffect(() => {
    if (postStatus === "idle") {
      dispatch(getMovieDetail(movieId));
    }
  }, [postStatus, dispatch, movieId]);

  return (
    <div
      className={`movie-detail-container ${
        lightTheme ? "" : "dark-theme-text"
      }`}
    >
      {movieDetailErrorApi ? (
        <ErrorPanel />
      ) : (
        movie && (
          <>
            <div className="movie-info-container">
              <div className="movie-title">{movie.title}</div>
              <div>{movie.overview}</div>
              <div className="movie-score">{movie.vote_average}/10</div>
            </div>
            <img
              className="movie-poster"
              src={imageServerUri + movie.poster_path}
              alt=""
            />
          </>
        )
      )}
    </div>
  );
};

export default MovieDetail;
