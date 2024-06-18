'use client';
import { Roboto } from 'next/font/google';
import { createTheme, responsiveFontSizes } from '@mui/material/styles';
import { red } from '@mui/material/colors';
import { useColorModeContext } from '../context/ColorModeContext';

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
      dark: '#0D0B22',
    },
    secondary: {
      main: '#7B00C7',
      contrastText: '#FFFFFF',
    },
    error: {
      main: red.A400,
    },
    background: {
      default: '#010403',
    },
    ochre: {
      main: '#E3D026',
      light: '#E9DB5D',
      dark: '#A29415',
      contrastText: '#242105',
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
      contrastText: '#0C130D',
    },
    error: {
      main: red.A400,
    },
    background: {
      default: '#FFFFFF',
    },
    ochre: {
      main: '#E3D026',
      light: '#E9DB5D',
      dark: '#A29415',
      contrastText: '#242105',
    },
  },
  typography: {
    fontFamily: roboto.style.fontFamily,
  },
});

lightTheme = responsiveFontSizes(lightTheme);

export { darkTheme, lightTheme };
