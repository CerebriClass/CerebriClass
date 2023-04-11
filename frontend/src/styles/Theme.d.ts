import '@emotion/react';

type Colors = {
  primary: {
    default: string;
    dark: string;
  };
  secondary: {
    default: string;
    light: string;
  };
  third: {
    default: string;
  };
  background: string;
};

type Fonts = {
  size: {
    h1: string;
    h2: string;
    h3: string;
    body: string;
    caption: string;
  };
  weight: {
    light: number;
    regular: number;
    medium: number;
    bold: number;
  };
};

declare module '@emotion/react' {
  export interface Theme {
    colors: Colors;
    fonts: Fonts;
  }
}
