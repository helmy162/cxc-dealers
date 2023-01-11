import PropTypes from 'prop-types';
// @mui
import { ThemeProvider, createTheme, useTheme } from '@mui/material/styles';
//
import useLocales from './useLocales';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

// ----------------------------------------------------------------------

ThemeLocalization.propTypes = {
  children: PropTypes.node,
};

export default function ThemeLocalization({ children }) {
  const outerTheme = useTheme();

  const { currentLang } = useLocales();

  const theme = createTheme(outerTheme, currentLang.systemValue);

  return <LocalizationProvider dateAdapter={AdapterDateFns}>
      <ThemeProvider theme={theme}> {children} </ThemeProvider>;
    </LocalizationProvider>
}
