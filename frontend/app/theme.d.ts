import { PaletteColorOptions, PaletteColor } from '@mui/material/styles';

declare module '@mui/material/styles' {
  interface Palette {
    contentBg?: PaletteColor;
    secondaryBg?: PaletteColor;
  }
  interface PaletteOptions {
    contentBg?: PaletteColorOptions;
    secondaryBg?: PaletteColorOptions;
  }
}

// Update the Button's color options to include an color option
declare module '@mui/material/Button' {
  interface ButtonPropsColorOverrides {
    contentBg: true;
    secondaryBg: true;
  }
}
