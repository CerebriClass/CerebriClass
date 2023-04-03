import '@emotion/react';

type Colors = {
  primary: {
    default: string;
    light: string;
  };
};

declare module '@emotion/react' {
  export interface Theme {
    colors: Colors;
  }
}
