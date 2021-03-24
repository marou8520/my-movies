import React from "react";
import Home from "./Home";
import MovieDetail from "./MovieDetail";
import Header from "./Header";
import { selectTheme } from "../redux/themeSlice";
import { selectMovieDetailstatus } from "../redux/movieDetailSlice";
import { selectstatus } from "../redux/moviesSlice";
import { useSelector } from "react-redux";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "../styles/App.css";
import CircularProgress from "@material-ui/core/CircularProgress";

function App() {
  const lightTheme = useSelector(selectTheme);
  const status = useSelector(selectstatus);
  const movieDetailStatus = useSelector(selectMovieDetailstatus);

  return (
    <Router>
      <div
        className={`app ${lightTheme ? "light-background" : "dark-background"}`}
      >
        {(status === "pending" || movieDetailStatus === "pending") && (
          <CircularProgress className="loader" />
        )}
        <Header />
        <Switch>
          <Route path="/movieDetail">
            <MovieDetail />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
