import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
// import './globals.css';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';
import {
  ColorModeProvider,
  useColorModeContext,
} from './context/ColorModeContext';
import { darkTheme, lightTheme } from './theme/theme';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'LiftNotes app',
  description: 'gym progress tracking app',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <ColorModeProvider>
        <body className={inter.className}>
          <AppRouterCacheProvider>
            <ThemeProvider theme={darkTheme}>
              <CssBaseline />
              {children}
            </ThemeProvider>
          </AppRouterCacheProvider>
        </body>
      </ColorModeProvider>
    </html>
  );
}
