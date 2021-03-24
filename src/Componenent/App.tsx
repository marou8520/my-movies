import React from "react";
import Home from "./Home";
import MovieDetail from "./MovieDetail";
import Header from "./Header";
import { selectTheme } from "../redux/themeSlice";
import { useSelector } from "react-redux";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "../styles/App.css";

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
