import { RootState } from "../app/store";
import { createAsyncThunk, createSlice, AnyAction, AsyncThunk } from "@reduxjs/toolkit";
import { apiUri, apiKey } from "../Constants/ServerInfo";
import MovieNode from "../Constants/MovieNode";

type GenericAsyncThunk = AsyncThunk<unknown, unknown, any>

type PendingAction = ReturnType<GenericAsyncThunk['pending']>
type RejectedAction = ReturnType<GenericAsyncThunk['rejected']>

interface MovieDetailNode extends MovieNode {
  overview: string;
  vote_average: number;
  vote_count: number;
}

interface MoviesState {
  status: "idle" | "pending" | "succeeded" | "failed";
  moviesList: MovieNode[];
  searchedMovies: MovieNode[] | null;
  movieDetail: MovieDetailNode | null;
}

const initialState = {
  moviesList: [],
  movieDetail: null,
  searchedMovies: null,
  status: "idle",
} as MoviesState;

//  Any pending action
function isPendingAction(action: AnyAction): action is PendingAction {
  return action.type.endsWith('/pending')
}

// Any rejected action
function isRejectedAction(action: AnyAction): action is RejectedAction {
  return action.type.endsWith('/rejected')
}

// Call the api to search for movie using a query string
export const searchMovie = createAsyncThunk("movies/searchMovie", async (searchedValue: string) => {
  const response = await fetch(
    `${apiUri}search/movie?api_key=${apiKey}&language=en-US&page=1&include_adult=false&query=${searchedValue}`
  );
  if(!response.ok) {
    return Promise.reject();
  }
  return await response.json();
});

// Fetch popular movies
export const fetchMovies = createAsyncThunk("movies/fetchMovies", async () => {
  const response = await fetch(
    `${apiUri}movie/popular?api_key=${apiKey}&language=en-US&page=1`
  );
  if(!response.ok) {
    return Promise.reject();
  }
  return await response.json();
});

// Get the movie detail by call the server api with the movie id
export const getMovieDetail = createAsyncThunk("movie/movieDetail", async (movieId: number) => {
  const response = await fetch(
    `${apiUri}movie/${movieId}?api_key=${apiKey}&language=en-US`
  );
  if(!response.ok) {
    return Promise.reject();
  }
  return await response.json();
});

export const moviesSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    // Reset the list of the searched movies
    resetSearch: (state) => {
      state.searchedMovies = null;
    },
    // Reseting the movie detail and the movie status to be able to call the api again
    resetState: (state) => {
      state.movieDetail = null;
      state.status = "idle";
    }
  },
  extraReducers: (builder) => {
    // Popular movies feteched with success case
    builder.addCase(fetchMovies.fulfilled, (state, { payload }) => {
      state.moviesList = payload.results;
      state.status = "succeeded";
    });

    // Results of the searched movies success case
    builder.addCase(searchMovie.fulfilled, (state, { payload }) => {
      state.searchedMovies = payload.results;
      state.status = "succeeded";
    });

    // Movie detail feteched with success case
    builder.addCase(getMovieDetail.fulfilled, (state, { payload }) => {
      state.movieDetail = payload;
      state.status = "succeeded";
    });

    // Action pending case
    builder.addMatcher(isPendingAction, (state, action) => {
      state.status = "pending";
    });

    // Action rejected case
    builder.addMatcher(isRejectedAction, (state, action) => {
      state.status = "failed"; 
    });
  },
});

export const { resetSearch } = moviesSlice.actions;
export const { resetState } = moviesSlice.actions;

export const selectMovie = (state: RootState) => state.movies.movieDetail;
export const selectMovies = (state: RootState) => state.movies.moviesList;
export const selectSearchedMovies = (state: RootState) => state.movies.searchedMovies;
export const selectstatus = (state: RootState) => state.movies.status;

export default moviesSlice.reducer;
