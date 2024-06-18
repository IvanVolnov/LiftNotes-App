import { PaletteColorOptions, PaletteColor } from '@mui/material/styles';

declare module '@mui/material/styles' {
  interface Palette {
    ochre?: PaletteColor;
  }
  interface PaletteOptions {
    ochre?: PaletteColorOptions;
  }
}
