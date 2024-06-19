'use client';
import { Roboto } from 'next/font/google';
import { createTheme, responsiveFontSizes } from '@mui/material/styles';

export const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
  fallback: ['Helvetica', 'Arial', 'sans-serif'],
});

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
    third: {
      main: '#0D0B22',
      dark: '#4b4a62',
      contrastText: '#FFFFFF',
    },
  },
  typography: {
    fontFamily: roboto.style.fontFamily,
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
      main: '#A394E6',
      contrastText: '#000000',
    },
    info: {
      main: '#7B00C7',
      contrastText: '#FFFFFF',
    },
    background: {
      default: '#FFFFFF',
    },
    third: {
      main: '#D9D6F4',
      dark: '#a9a0e5',
      contrastText: '#000000',
    },
  },
  typography: {
    fontFamily: roboto.style.fontFamily,
  },
});

lightTheme = responsiveFontSizes(lightTheme);

export { darkTheme, lightTheme };
