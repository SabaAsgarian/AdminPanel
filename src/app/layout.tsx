"use client"
import { usePathname } from 'next/navigation';
import ResponsiveDrawer from './components/ResponsiveDrawer';
import { Box } from '@mui/material';
import { ThemeProvider } from './themeContext'
import { Providers } from './providers'
import { MyContextProvider } from './myContext'
import { ReactNode } from 'react';

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  const pathname = usePathname();
  
  // Define the paths where ResponsiveDrawer should be displayed
  const pathsWithDrawer = ['/users', '/dashboard', '/products', '/reports', '/revenue', './components/transactions'];

  return (
    <html lang="en">
      <body className='bg-[#f3f5f9]'>
        <Providers>
          <MyContextProvider>
            <ThemeProvider>
              <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh',maxHeight:'auto' }}>
                {pathsWithDrawer.includes(pathname) && <ResponsiveDrawer>{children}</ResponsiveDrawer>}
                {!pathsWithDrawer.includes(pathname) && <Box component="main" sx={{ flexGrow: 1, bgcolor: '#f3f5f9', color: 'text.primary' }}>
                  {children}
                </Box>}
              </Box>
            </ThemeProvider>
          </MyContextProvider>
        </Providers>
      </body>
    </html>
  );
}