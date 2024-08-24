import { PaletteColorOptions, PaletteColor } from '@mui/material/styles';

// Augment the palette to include a new colors
declare module '@mui/material/styles' {
  interface Palette {
    contentBg: Palette['primary'];
    secondaryBg: Palette['primary'];
  }

  interface PaletteOptions {
    contentBg?: PaletteOptions['primary'];
    secondaryBg?: PaletteOptions['primary'];
  }
}

// Update the Button's color options to include an color option
declare module '@mui/material/Button' {
  interface ButtonPropsColorOverrides {
    contentBg: true;
    secondaryBg: true;
  }
}
