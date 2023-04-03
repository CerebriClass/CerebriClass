import { ErrorPage } from '@/pages/ErrorPage';
import { defaultTheme } from '@/styles/defaultTheme';
import { ThemeProvider } from '@emotion/react';
import { ErrorBoundary } from 'react-error-boundary';
import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter as Router } from 'react-router-dom';

export const AppProvider = ({ children }: React.PropsWithChildren) => {
  return (
    <ErrorBoundary fallback={<ErrorPage statusCode={999} />}>
      <HelmetProvider>
        <ThemeProvider theme={defaultTheme}>
          <Router>{children}</Router>
        </ThemeProvider>
      </HelmetProvider>
    </ErrorBoundary>
  );
};
