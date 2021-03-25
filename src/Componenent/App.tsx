import React from "react";
import Home from "./Home";
import MovieDetail from "./MovieDetail";
import Header from "./Header";
import { selectTheme } from "../redux/themeSlice";
import { selectstatus } from "../redux/moviesSlice";
import { useSelector } from "react-redux";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "../styles/App.css";
import CircularProgress from "@material-ui/core/CircularProgress";
import { ThemeProvider } from "styled-components";
import theme from "../styles/my-theme";
import styled from "styled-components";

interface AppContainerProps {
  readonly lightTheme: boolean;
}

const AppContainer = styled.div<AppContainerProps>`
  background-color: ${(props) =>
    props.lightTheme
      ? props.theme.backgroundColors.light
      : props.theme.backgroundColors.dark};
`;

function App() {
  const lightTheme = useSelector(selectTheme);
  const status = useSelector(selectstatus);

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <AppContainer lightTheme={lightTheme} className="app">
          {status === "pending" && <CircularProgress className="loader" />}
          <Header />
          <Switch>
            <Route path="/movieDetail">
              <MovieDetail />
            </Route>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </AppContainer>
      </Router>
    </ThemeProvider>
  );
}

export default App;
