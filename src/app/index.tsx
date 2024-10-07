import { FC } from 'react';
import { GlobalStyles } from './styled';
import { AppProviders } from './providers';
import { SummaryWidget } from '@/pages/summary';
import { InvoicesWidget } from '@/pages/invoices/InvoicesWidget';
import { PageContainer } from '@/shared/ui/ui_kit';

export const App: FC = () => {
  return (
    <AppProviders>
      {/* eslint-disable-next-line */}
      {/* @ts-ignore */}
      <GlobalStyles />
      <PageContainer>
        <SummaryWidget />
        <InvoicesWidget />
      </PageContainer>
      {/*<RouterProvider router={appRouter} />*/}
    </AppProviders>
  );
};
