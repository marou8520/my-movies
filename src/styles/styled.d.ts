// import original module declarations
import 'styled-components';

// and extend them!
declare module 'styled-components' {
  export interface DefaultTheme {
    backgroundColors: {
      light: string;
      dark: string;
    };
    textColors: {
      light: string;
      dark: string;
    };
    headerColors: {
      light: string,
      dark: string,
    },
  }
}