import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../app/store";
import { createAsyncThunk } from "@reduxjs/toolkit";

interface MovieNode {
  title: string;
  id: number;
  backdrop_path: string;
  poster_path: string;
}

export const searchMovie = createAsyncThunk("movies/searchMovie", async (searchedValue: string) => {
  const response = await fetch(
    `https://api.themoviedb.org/3/search/movie?api_key=b733f9f3727f7a148f45111ceb4cff9a&language=en-US&page=1&include_adult=false&query=${searchedValue}`
  );
  return await response.json();
});

export const fetchMovies = createAsyncThunk("movies/fetchMovies", async () => {
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/popular?api_key=b733f9f3727f7a148f45111ceb4cff9a&language=en-US&page=1`
  );
  return await response.json();
});

interface MoviesState {
  status: "idle" | "pending" | "succeeded" | "failed";
  error: string | null;
  moviesList: MovieNode[];
  searchedMovies: MovieNode[] | null;
}

const initialState = {
  moviesList: [],
  searchedMovies: null,
  error: null,
  status: "idle",
} as MoviesState;

export const moviesSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    resetSearch: (state) => {
      state.searchedMovies = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchMovies.pending, (state) => {
      state.status = "pending";
      state.error = null;
    });

    builder.addCase(fetchMovies.fulfilled, (state, { payload }) => {
      state.moviesList = payload.results;
      state.status = "succeeded";
    });

    builder.addCase(fetchMovies.rejected, (state, { error }) => {
      if (error && error.message) state.error = error.message;
      state.status = "failed";
    });

    builder.addCase(searchMovie.pending, (state) => {
      state.status = "pending";
      state.error = null;
    });

    builder.addCase(searchMovie.fulfilled, (state, { payload }) => {
      state.searchedMovies = payload.results;
      state.status = "succeeded";
    });

    builder.addCase(searchMovie.rejected, (state, { error }) => {
      if (error && error.message) state.error = error.message;
      state.status = "failed";
    });
  },
});

export const { resetSearch } = moviesSlice.actions;

export const selectMovies = (state: RootState) => state.movies.moviesList;
export const selectSearchedMovies = (state: RootState) => state.movies.searchedMovies;
export const selectstatus = (state: RootState) => state.movies.status;
export const selectError = (state: RootState) => state.movies.error;

export default moviesSlice.reducer;
