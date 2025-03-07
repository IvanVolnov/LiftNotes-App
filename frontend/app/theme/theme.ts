'use client';
import { Roboto } from 'next/font/google';
import { Inter } from 'next/font/google';
import { createTheme, responsiveFontSizes } from '@mui/material/styles';

const inter = Inter({ subsets: ['latin'] });

let darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#28d291',
    },
    secondary: {
      main: '#7B00C7',
      contrastText: '#FFFFFF',
    },
    info: {
      main: '#7B00C7',
      contrastText: '#FFFFFF',
    },
    background: {
      default: '#010403',
    },
    contentBg: {
      main: '#0D0B22',
      contrastText: '#FFFFFF',
    },
    secondaryBg: {
      main: '#090C0B',
      contrastText: '#FFFFFF',
    },
  },
  typography: {
    fontFamily: inter.style.fontFamily,
  },
});

darkTheme = responsiveFontSizes(darkTheme);

let lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#28d291',
    },
    secondary: {
      main: '#7B00C7',
      contrastText: '#FFFFFF',
    },
    info: {
      main: '#7B00C7',
      contrastText: '#FFFFFF',
    },
    background: {
      default: '#FFFFFF',
    },
    contentBg: {
      main: '#D9D6F4',
      dark: '#A394E6',
      contrastText: '#000000',
    },
    secondaryBg: {
      main: '#F3F6F5',
      contrastText: '#000000',
    },
  },
  typography: {
    fontFamily: inter.style.fontFamily,
  },
});

lightTheme = responsiveFontSizes(lightTheme);

export { darkTheme, lightTheme };
