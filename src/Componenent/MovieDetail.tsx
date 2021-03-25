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
import styled from "styled-components";

interface MovieDetailsProps {
  readonly lightTheme: boolean;
}

interface MoviePosterProps {
  readonly poster_path: string | null;
}

interface LocationState {
  movieId: number;
}

const MovieDetailsContainer = styled.div<MovieDetailsProps>`
  color: ${(props) =>
    props.lightTheme
      ? props.theme.textColors.light
      : props.theme.textColors.dark};
`;

const MoviePoster = styled.img<MoviePosterProps>`
  object-fit: ${(props) => (!props.poster_path ? "none" : "")};
  background-color: ${(props) => (!props.poster_path ? "#dbdbdb" : "")};
`;

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
    <MovieDetailsContainer
      lightTheme={lightTheme}
      className="movie-detail-container"
    >
      {movieDetailErrorApi ? (
        <ErrorPanel />
      ) : (
        movie && (
          <>
            <div className="movie-info-container">
              <h2 className="movie-title">{movie.title}</h2>
              <p>
                {movie.overview
                  ? movie.overview
                  : "Ce film ne contient pas encore de description !"}
              </p>
              <h4 className="movie-score">
                {!!movie.vote_count
                  ? movie.vote_average + "/10"
                  : "Ce film n'est pas encore noté !"}
              </h4>
            </div>
            <MoviePoster
              className="movie-poster"
              poster_path={movie.poster_path}
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
    </MovieDetailsContainer>
  );
};

export default MovieDetail;
