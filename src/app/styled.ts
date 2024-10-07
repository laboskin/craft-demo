import { createGlobalStyle } from 'styled-components';
import { themeValue } from '@/shared/ui/theme';

export const GlobalStyles = createGlobalStyle`
  html, body {
      height: 100%;
      width: 100%;
      margin: 0;
      color: ${themeValue('colors.black')};
  }
  
  td {
      border: 1px solid #444;
      padding: 4px;
  }
  
  
`;
