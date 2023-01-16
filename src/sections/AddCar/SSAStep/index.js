import * as Yup from 'yup';
// @mui
import { Stack, Alert, Box } from '@mui/material';
import { ENGINE_AND_TRANSMISSION_OPTIONS } from '../constants';
import { renderAddCarSelect } from 'src/utils/forms';
import { RHFTextField } from 'src/components/hook-form';

// ----------------------------------------------------------------------
export const SSASchema = Yup.object().shape({
  Brake_Pads: Yup.string(),
  Brake_Discs_Or_Lining: Yup.string(),
  Parking_Brake_Operations: Yup.string(),
  Suspension: Yup.string(),
  Shock_Absorber_Operation: Yup.string(),
  Steering_Operation: Yup.string(),
  Steering_Alignment: Yup.string(),
  Wheel_Alignment: Yup.string(),
  Extra_Comments: Yup.string(),
});

export const SSADefaultValues = {
  Brake_Pads: "no_visible_fault",
  Brake_Discs_Or_Lining: "no_visible_fault",
  Parking_Brake_Operations: "no_visible_fault",
  Suspension: "no_visible_fault",
  Shock_Absorber_Operation: "no_visible_fault",
  Steering_Operation: "no_visible_fault",
  Steering_Alignment: "no_visible_fault",
  Wheel_Alignment: "no_visible_fault",
  Extra_Comments: "",
};

const fields = [
  { name: 'Brake_Pads', label: 'Brake Pads'},
  { name: 'Brake_Discs_Or_Lining', label: 'Brake Discs Or Lining' },
  { name: 'Parking_Brake_Operations', label: 'Parking Brake Operations' },
  { name: 'Suspension', label: 'Suspension' },
  { name: 'Shock_Absorber_Operation', label: 'Shock Absorber Operation'},
  { name: 'Steering_Operation', label: 'Steering Operation'},
  { name: 'Steering_Alignment', label: 'Steering Alignment'},
  { name: 'Wheel_Alignment', label: 'Wheel Alignment'},
];

export default function SSAStep({ errors }) {
  return (
    <Stack spacing={3}>
      {!!errors.afterSubmit && <Alert severity="error">{errors.afterSubmit.message}</Alert>}
      <Box
        rowGap={2}
        columnGap={3}
        display="grid"
        gridTemplateColumns={{
          sm: 'repeat(1, 1fr)',
          md: 'repeat(3, 1fr)',
        }}
      >
        { fields.map(field => renderAddCarSelect({...field, options: field.options || ENGINE_AND_TRANSMISSION_OPTIONS })) }
        <RHFTextField name="Extra_Comments" label="Comments" multiline />
      </Box>
  </Stack>);
}
