import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../app/store';
import { createAsyncThunk } from "@reduxjs/toolkit";

interface MovieNode {
  original_title: string;
  id: number;
  backdrop_path: string;
  poster_path: string;
}

export const fetchMovies = createAsyncThunk(
  'movies/fetchMovies',
  async () => {
    const response = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=b733f9f3727f7a148f45111ceb4cff9a&language=en-US&page=1`)
    return (await response.json())
  }
)

interface MoviesState  {
  status: 'idle' | 'pending' | 'succeeded' | 'failed';
  
  error: string | null;
  moviesList: MovieNode[];
};

const initialState = {
  moviesList: [],
  error: null,
  status: "idle",
} as MoviesState;


export const moviesSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    changeTheme: state => {
      state.moviesList = [];
    },
  },
  extraReducers: builder => {
     builder.addCase(fetchMovies.pending, (state) => {
      state.status = "pending";
      state.error = null;
    }); 

    builder.addCase(fetchMovies.fulfilled, 
      (state, { payload }) => {
      state.moviesList = payload.results;
      state.status = "succeeded";
    });
    
    builder.addCase(fetchMovies.rejected, 
      (state, { error }) => {
        if (error && error.message) state.error = error.message;
      state.status = "failed"; 
    }); 

  }
});

export const { changeTheme } = moviesSlice.actions;

export const selectMovies = (state: RootState) => state.movies.moviesList;
export const selectstatus = (state: RootState) => state.movies.status;
export const selectError = (state: RootState) => state.movies.error;

export default moviesSlice.reducer;
