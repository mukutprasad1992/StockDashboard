import { DefaultTheme } from 'react-native-paper';

type CustomTheme = typeof DefaultTheme & {
  colors: {
    text: string;
    primary: string;
    secondary: string;
    error: string;
  };
};

export const theme: CustomTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    text: '#000000',
    primary: '#560CCE',
    secondary: '#414757',
    error: '#f13a59',
  },
};

export default theme;
