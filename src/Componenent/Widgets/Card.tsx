import React from "react";
import { withStyles, Theme } from "@material-ui/core/styles";
import { Tooltip, Typography } from "@material-ui/core";
import { imageServerUri } from "../../Constants/ServerInfo";
import without_poster from "../../assets/without_poster.png";
import MovieNode from "../../Constants/MovieNode";
import "../../styles/widgets/Card.css";

interface ToggleProps {
  movie: MovieNode;
  showMovieDetailCallBack: (movieId: number) => void;
}

const HtmlTooltip = withStyles((theme: Theme) => ({
  tooltip: {
    backgroundColor: "#f5f5f9",
    color: "rgba(0, 0, 0, 0.87)",
    maxWidth: 220,
    fontSize: theme.typography.pxToRem(12),
    border: "1px solid #dadde9",
  },
}))(Tooltip);

// Show movie poster if the poster path exist otherwise show default poster image
const showMoviePoster = (
  poster_path: string,
  movieId: number,
  showMovieDetailCallBack: (movieId: number) => void
) => {
  return (
    <img
      className={!poster_path ? "without-poster" : ""}
      src={poster_path ? imageServerUri + poster_path : without_poster}
      alt=""
      onClick={() => showMovieDetailCallBack(movieId)}
    />
  );
};

const Card = (Props: ToggleProps) => {
  const { movie, showMovieDetailCallBack } = Props;
  return (
    <HtmlTooltip
      title={<Typography color="inherit">{movie.title}</Typography>}
      className="movie-card"
    >
      {showMoviePoster(movie.poster_path, movie.id, showMovieDetailCallBack)}
    </HtmlTooltip>
  );
};

export default Card;
