import { ReactNode, FC } from 'react';
import { queryClient } from '@/shared/api/query_client';
import { QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from 'styled-components';
import { styledTheme } from '@/shared/ui/theme';

export const AppProviders: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <ThemeProvider theme={styledTheme}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </ThemeProvider>
  );
};
