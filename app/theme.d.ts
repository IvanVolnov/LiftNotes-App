import { PaletteColorOptions, PaletteColor } from '@mui/material/styles';

declare module '@mui/material/styles' {
  interface Palette {
    third?: PaletteColor;
  }
  interface PaletteOptions {
    third?: PaletteColorOptions;
  }
}

// Update the Button's color options to include an color option
declare module '@mui/material/Button' {
  interface ButtonPropsColorOverrides {
    third: true;
  }
}
