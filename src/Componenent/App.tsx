import React from "react";
import "../styles/App.css";
import Home from "./Home";
import MovieDetail from "./MovieDetail";
import { selectTheme } from "../redux/themeSlice";
import { useSelector } from "react-redux";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from "./Header";

function App() {
  const lightTheme = useSelector(selectTheme);

  return (
    <Router>
      <div
        className={`app ${lightTheme ? "light-background" : "dark-background"}`}
      >
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
