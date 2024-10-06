export const styledTheme = {
  colors: {
    black: '#0D0D0D',
    white: '#FFFFFF',
    grayLight: '#EAEAEA',
    grayDark: '#2E2E2E',
    accent: '#1811d6',
  },
  typography: {
    fontSize: {
      small: '0.875rem',
      medium: '1rem',
      large: '1.5rem',
      xlarge: '2rem',
    },
    fontWeight: {
      light: 300,
      regular: 400,
      medium: 500,
      bold: 700,
    },
  },
  shadows: {
    light: '0px 1px 3px rgba(0, 0, 0, 0.12)',
    medium: '0px 4px 6px rgba(0, 0, 0, 0.16)',
    dark: '0px 10px 20px rgba(0, 0, 0, 0.19)',
  },
  borderRadius: {
    small: '4px',
    medium: '8px',
    large: '16px',
  },
};
export type Theme = typeof styledTheme;

type NestedKeyOf<ObjectType extends object> = {
  [Key in keyof ObjectType & (string | number)]: ObjectType[Key] extends object
    ? // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      `${Key}.${NestedKeyOf<ObjectType[Key]>}`
    : `${Key}`;
}[keyof ObjectType & (string | number)];

export const themeValue =
  (path: NestedKeyOf<Theme>) => (props: { theme: Theme }) =>
    path
      .split('.')
      // eslint-disable-next-line
      .reduce((acc: any, part: string) => acc && acc[part], props.theme);
