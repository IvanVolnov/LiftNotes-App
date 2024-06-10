import { GlobalStyles } from '@mui/material';

const globalStyles = (
  <GlobalStyles
    styles={(theme) => ({
      html: {
        height: '100%',
        fontSize: '62.5%',
      },
      body: {
        margin: 0,
        padding: theme.spacing(2),
        backgroundColor: theme.palette.background.default,
        color: theme.palette.text.primary,
        fontFamily: theme.typography.fontFamily,
      },
      // ... You can add more global styles here
    })}
  />
);

export default globalStyles;
