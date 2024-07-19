import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
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
        <body className={inter.className}>
          <AppRouterCacheProvider>
            <CssBaseline />
            {children}
          </AppRouterCacheProvider>
        </body>
      </ColorModeProvider>
    </html>
  );
}
