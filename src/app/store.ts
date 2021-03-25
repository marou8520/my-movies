import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import themeReducer from "../redux/themeSlice";
import moviesReducer from "../redux/moviesSlice";

export const store = configureStore({
  reducer: {
    theme: themeReducer,
    movies: moviesReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
