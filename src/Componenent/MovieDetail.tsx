import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getMovieDetail,
  selectMovieDetailstatus,
  selectMovie,
  resetMovieDetail,
  selectMovieDetailError,
} from "../redux/movieDetailSlice";
import { selectTheme } from "../redux/themeSlice";
import { useLocation } from "react-router-dom";
import { imageServerUri } from "../Constants/ServerInfo";
import ErrorPanel from "./Widgets/ErrorPanel";
import without_poster from "../assets/without_poster.png";
import "../styles/MovieDetail.css";

interface LocationState {
  movieId: number;
}

const MovieDetail: React.FC = () => {
  const dispatch = useDispatch();
  const location = useLocation<LocationState>();
  const movie = useSelector(selectMovie);
  const postStatus = useSelector(selectMovieDetailstatus);
  const lightTheme = useSelector(selectTheme);
  const movieDetailErrorApi = useSelector(selectMovieDetailError);

  const { movieId } = location.state;

  // Reset movie detail when component will unmount
  useEffect(() => {
    return () => {
      dispatch(resetMovieDetail());
    };
  }, [dispatch]);

  // Calling movie detail from api when the componenet did the mount
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
              <div>
                {movie.overview
                  ? movie.overview
                  : "Sorry, there is no overview for this film !"}
              </div>
              <div className="movie-score">{movie.vote_average}/10</div>
            </div>
            <img
              className={
                "movie-poster" +
                (!movie.poster_path ? " movie-without-poster" : "")
              }
              src={
                movie.poster_path
                  ? imageServerUri + movie.poster_path
                  : without_poster
              }
              alt=""
            />
          </>
        )
      )}
    </div>
  );
};

export default MovieDetail;
