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
}

const ColorModeContextDefaultValue: ColorModeContextProps = {
  colorMode: '',
  toggleColorMode: () => {},
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
    const savedColorMode =
      localStorage.getItem('colorMode') ||
      window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light';
    setColorMode(savedColorMode);
    localStorage.setItem('colorMode', savedColorMode);
  }, []);

  function toggleColorMode() {
    colorMode === 'dark' ? setColorMode('light') : setColorMode('dark');
    colorMode === 'dark'
      ? localStorage.setItem('colorMode', 'light')
      : localStorage.setItem('colorMode', 'dark');
  }
  return (
    <ColorModeContext.Provider value={{ colorMode, toggleColorMode }}>
      {children}
    </ColorModeContext.Provider>
  );
}

export const useColorModeContext = () => useContext(ColorModeContext);
