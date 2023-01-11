import PropTypes from 'prop-types';
// @mui
import { Box, InputAdornment } from '@mui/material';
// components
import {
  RHFTextField,
  RHFAutocomplete,
} from '.';


// ----------------------------------------------------------------------

RHFAutocomplete.propTypes = {
  name: PropTypes.string,
  label: PropTypes.string,
  setValue: PropTypes.func,
};

export default function CurrencyField({ name, label, setValue, ...other }) {
  return (
    <RHFTextField
      name={name}
      label={label}
      placeholder="0.00"
      onChange={(event) => 
        setValue(name, Number(event.target.value), { shouldValidate: true })
      }
      InputLabelProps={{ shrink: true }}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <Box component="span" sx={{ color: 'text.disabled' }}>
              $
            </Box>
          </InputAdornment>
        ),
        type: 'number',
      }}
      {...other}
    />
  );
}
