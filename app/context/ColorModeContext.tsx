'use client';
import {
  ReactNode,
  useEffect,
  useState,
  createContext,
  useContext,
  useMemo,
} from 'react';

import { ThemeProvider } from '@mui/material/styles';
import { darkTheme, lightTheme } from '../theme/theme';

interface ColorModeContextProps {
  colorMode: string;
  toggleColorMode: () => void;
  checkIfDarkMode: () => boolean;
}

const ColorModeContextDefaultValue: ColorModeContextProps = {
  colorMode: '',
  toggleColorMode: () => {},
  checkIfDarkMode: () => false,
};

const ColorModeContext = createContext<ColorModeContextProps>(
  ColorModeContextDefaultValue
);

export function UseColorMode() {
  return useContext(ColorModeContext);
}

interface Props {
  children: ReactNode;
}

export function ColorModeProvider({ children }: Props) {
  const [colorMode, setColorMode] = useState('');

  useEffect(() => {
    const browserColorScheme = window.matchMedia('(prefers-color-scheme: dark)')
      .matches
      ? 'dark'
      : 'light';
    const storageColorMode = localStorage.getItem('colorMode');
    const finalColorMode = storageColorMode || browserColorScheme;
    localStorage.setItem('colorMode', finalColorMode);
    setColorMode(finalColorMode);
  }, []);

  function toggleColorMode() {
    const newColorMode = colorMode === 'dark' ? 'light' : 'dark';
    setColorMode(newColorMode);
    localStorage.setItem('colorMode', newColorMode);
  }

  function checkIfDarkMode() {
    return colorMode === 'dark';
  }

  const theme = useMemo(
    () => (colorMode === 'light' ? lightTheme : darkTheme),
    [colorMode]
  );

  return (
    <ColorModeContext.Provider
      value={{ colorMode, toggleColorMode, checkIfDarkMode }}
    >
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export const useColorModeContext = () => useContext(ColorModeContext);
