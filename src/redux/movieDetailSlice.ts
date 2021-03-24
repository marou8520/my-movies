import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../app/store";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiUri, apiKey } from "../Constants/ServerInfo";

interface MovieNode {
  title: string;
  id: number;
  backdrop_path: string;
  poster_path: string;
  overview: string;
  vote_average: number;
}

export const getMovieDetail = createAsyncThunk("movie/movieDetail", async (searchedValue: number) => {
  const response = await fetch(
    `${apiUri}movie/${searchedValue}?api_key=${apiKey}&language=en-US`
  );
  if(!response.ok) {
    return Promise.reject();
  }
  return await response.json();
});

interface MovieDetailState {
  status: "idle" | "pending" | "succeeded" | "failed";
  error: string | null;
  movieDetail: MovieNode | null;
}

const initialState = {
  movieDetail: null,
  error: null,
  status: "idle",
} as MovieDetailState;

export const movieDetailSlice = createSlice({
  name: "movie",
  initialState,
  reducers: {
    resetMovieDetail: (state) => {
      state.movieDetail = null;
      state.status = "idle";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getMovieDetail.pending, (state) => {
      state.status = "pending";
      state.error = null;
    });

    builder.addCase(getMovieDetail.fulfilled, (state, { payload }) => {
      state.movieDetail = payload;
      state.status = "succeeded";
    });

    builder.addCase(getMovieDetail.rejected, (state, { error }) => {
      if (error && error.message) state.error = error.message;
      state.status = "failed";
    });
  },
});

export const { resetMovieDetail } = movieDetailSlice.actions;

export const selectMovie = (state: RootState) => state.movie.movieDetail;
export const selectstatus = (state: RootState) => state.movie.status;
export const selectMovieDetailError = (state: RootState) => state.movie.error;

export default movieDetailSlice.reducer;
