'use client';
import {
  ReactNode,
  useEffect,
  useState,
  createContext,
  useContext,
  Dispatch,
  SetStateAction,
} from 'react';

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
    const browserColorScgeme = window.matchMedia('(prefers-color-scheme: dark)')
      .matches
      ? 'dark'
      : 'light';
    const storageColorMode = localStorage.getItem('colorMode');
    const finalColorMode = storageColorMode || browserColorScgeme;
    localStorage.setItem('colorMode', finalColorMode);
    setColorMode(finalColorMode);
  }, []);

  function toggleColorMode() {
    colorMode === 'dark' ? setColorMode('light') : setColorMode('dark');
    colorMode === 'dark'
      ? localStorage.setItem('colorMode', 'light')
      : localStorage.setItem('colorMode', 'dark');
  }

  function checkIfDarkMode() {
    const result: boolean = colorMode === 'dark' ? true : false;
    return result;
  }
  return (
    <ColorModeContext.Provider
      value={{ colorMode, toggleColorMode, checkIfDarkMode }}
    >
      {children}
    </ColorModeContext.Provider>
  );
}

export const useColorModeContext = () => useContext(ColorModeContext);
