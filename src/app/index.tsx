import { FC } from 'react';
import { RouterProvider } from 'react-router-dom';
import { appRouter } from './router';
import { GlobalStyles } from './styled';
import { AppProviders } from './providers';

export const App: FC = () => {
  return (
    <AppProviders>
      {/* eslint-disable-next-line */}
      {/* @ts-ignore */}
      <GlobalStyles />
      <RouterProvider router={appRouter} />
    </AppProviders>
  );
};
