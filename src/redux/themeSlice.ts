import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../app/store';

interface ThemeState {
  lightTheme: boolean;
}

const initialState: ThemeState = {
  lightTheme: true,
};

export const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    changeTheme: state => {
      state.lightTheme = ! state.lightTheme;
    },
  },
});

export const { changeTheme } = themeSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectTheme = (state: RootState) => state.theme.lightTheme;

export default themeSlice.reducer;
