import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../app/store";

interface ThemeState {
  lightTheme: boolean;
}

const initialState: ThemeState = {
  lightTheme: true,
};

export const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    changeTheme: (state) => {
      state.lightTheme = !state.lightTheme;
    },
  },
});

export const { changeTheme } = themeSlice.actions;

export const selectTheme = (state: RootState) => state.theme.lightTheme;

export default themeSlice.reducer;
