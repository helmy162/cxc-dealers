import PropTypes from 'prop-types';
// form
import { useFormContext, Controller } from 'react-hook-form';
// @mui
import { DatePicker } from '@mui/x-date-pickers';
import { TextField } from '@mui/material';

// ----------------------------------------------------------------------

RHFDatePicker.propTypes = {
  name: PropTypes.string,
  helperText: PropTypes.node,
};

export default function RHFDatePicker({ name, helperText, ...other }) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={
          ({ field: { onChange, ...restField }, fieldState: { error } }) =>
            <DatePicker
              label="Request Date"
              onChange={(event) => onChange(event)}
              renderInput={(params) =>
                <TextField
                  {...params}
                  error={!!error}
                  helperText={error ? error?.message : helperText}
                />}
              {...restField}
              {...other}
            />
        }
    /> 
  );
}


