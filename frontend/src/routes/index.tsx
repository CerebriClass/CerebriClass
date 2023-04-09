import { MainLayout } from '@/components/layouts/MainLayout';
import { lazyImport } from '@/utils/lazyImport';
import { Suspense } from 'react';
import { Navigate, Outlet, useRoutes } from 'react-router-dom';

const { LandingPage } = lazyImport(
  () => import('@/pages/LandingPage'),
  'LandingPage'
);

const { CreateSheetPage } = lazyImport(
  () => import('@/pages/CreateSheetPage'),
  'CreateSheetPage'
);
const { ErrorPage } = lazyImport(
  () => import('@/pages/ErrorPage'),
  'ErrorPage'
);

const App = () => {
  return (
    <MainLayout>
      <Suspense fallback={<p>Loading...</p>}>
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
        { path: '/404', element: <ErrorPage statusCode={404} /> },
      ],
    },
  ];
  const restRoutes = [{ path: '*', element: <Navigate to="/404" /> }];
  const element = useRoutes([...commonRoutes, ...restRoutes]);

  return <>{element}</>;
};
