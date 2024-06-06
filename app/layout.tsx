import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import ThemeRegistry from './theme/ThemeRegistry';
import { CssBaseline } from '@mui/material';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';
import { ColorModeProvider } from './context/ColorModeContext';

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
        <ThemeRegistry>
          <CssBaseline />
          <body className={inter.className}>
            <AppRouterCacheProvider>{children}</AppRouterCacheProvider>
          </body>
        </ThemeRegistry>
      </ColorModeProvider>
    </html>
  );
}
