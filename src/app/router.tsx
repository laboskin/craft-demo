import { Navigate, Outlet, createBrowserRouter } from 'react-router-dom';

const AppLayout = () => {
  return <Outlet />;
};

export const appRouter = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        path: '/',
        element: <Navigate to="some-page" replace={true} />,
      },
      {
        path: '/some-page',
        element: (
          <>
            <div style={{ textAlign: 'center', fontSize: '10rem' }}> 👋🏻 🌎</div>
          </>
        ),
      },
    ],
  },
]);
