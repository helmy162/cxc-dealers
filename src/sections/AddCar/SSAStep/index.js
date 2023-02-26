import * as Yup from 'yup';
// @mui
import { Stack, Alert, Box } from '@mui/material';
import { 
  ENGINE_AND_TRANSMISSION_OPTIONS,
  brakePadsOptions,
  brakeDiscsOrLiningOptions,
  parkingBrakeOperationsOptions,
  suspensionOptions,
  shockAbsorberOperationOptions,
  steeringOperationOptions,
  steeringAlignmentOptions,
  wheelAlignmentOptions,} from './constants';
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
  Steering_Comment: Yup.string(),
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
  Steering_Comment: "",
};

const fields = [
  { name: 'Brake_Pads', label: 'Brake Pads', options: brakePadsOptions },
  { name: 'Brake_Discs_Or_Lining', label: 'Brake Discs Or Lining', options: brakeDiscsOrLiningOptions},
  { name: 'Parking_Brake_Operations', label: 'Parking Brake Operations', options: parkingBrakeOperationsOptions },
  { name: 'Suspension', label: 'Suspension', options: suspensionOptions},
  { name: 'Shock_Absorber_Operation', label: 'Shock Absorber Operation', options: shockAbsorberOperationOptions},
  { name: 'Steering_Operation', label: 'Steering Operation', options: steeringOperationOptions},
  { name: 'Steering_Alignment', label: 'Steering Alignment', options: steeringAlignmentOptions},
  { name: 'Wheel_Alignment', label: 'Wheel Alignment', options: wheelAlignmentOptions}
];

export default function SSAStep() {
  return (
    <Stack spacing={3}>
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
        <RHFTextField name="Steering_Comment" label="Comments" multiline />
      </Box>
  </Stack>);
}
