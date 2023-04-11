import { MainLayout } from '@/components/layouts/MainLayout';
import { lazyImport } from '@/utils/lazyImport';
import { useTheme } from '@emotion/react';
import { Suspense } from 'react';
import { Outlet, useRoutes } from 'react-router-dom';
import { PuffLoader } from 'react-spinners';

const { LandingPage } = lazyImport(
  () => import('@/pages/LandingPage'),
  'LandingPage'
);

const { CreateSheetPage } = lazyImport(
  () => import('@/pages/CreateSheetPage'),
  'CreateSheetPage'
);

const { AboutPage } = lazyImport(
  () => import('@/pages/AboutPage'),
  'AboutPage'
);

const { NotFoundPage } = lazyImport(
  () => import('@/pages/ErrorPage'),
  'NotFoundPage'
);

const App = () => {
  const theme = useTheme();

  return (
    <MainLayout>
      <Suspense
        fallback={<PuffLoader color={theme.colors.primary.default} loading />}
      >
        <Outlet />
      </Suspense>
    </MainLayout>
  );
};

export const AppRoutes = () => {
  const commonRoutes = [
    {
      path: '/',
      element: <App />,
      children: [
        { path: '/', element: <LandingPage /> },
        { path: '/create-sheet', element: <CreateSheetPage /> },
        { path: '/about', element: <AboutPage /> },
        { path: '*', element: <NotFoundPage /> },
      ],
    },
  ];
  const element = useRoutes([...commonRoutes]);

  return <>{element}</>;
};
