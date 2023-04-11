import { defaultTheme } from '@/styles/defaultTheme';
import { ThemeProvider } from '@emotion/react';
import { ErrorBoundary } from 'react-error-boundary';
import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter as Router } from 'react-router-dom';

export const AppProvider = ({ children }: React.PropsWithChildren) => {
  return (
    <ErrorBoundary
      fallback={
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <p>💥 Rendering Error</p>
            <p>Please see the console :(</p>
          </div>
        </div>
      }
    >
      {' '}
      <HelmetProvider>
        <ThemeProvider theme={defaultTheme}>
          <Router>{children}</Router>
        </ThemeProvider>
      </HelmetProvider>
    </ErrorBoundary>
  );
};
