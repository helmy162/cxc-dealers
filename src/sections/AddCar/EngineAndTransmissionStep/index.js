import * as Yup from 'yup';
// @mui
import { Stack, Alert, Box } from '@mui/material';
import { ENGINE_AND_TRANSMISSION_OPTIONS, ENGINE_SMOKE_OPTIONS, ENGINE_NOISE_OPTIONS } from '../constants';
import { renderAddCarSelect } from 'src/utils/forms';
import { RHFTextField } from 'src/components/hook-form';

// ----------------------------------------------------------------------

export const EngineAndTransmissionSchema = Yup.object().shape({
  Radiator_Condition: Yup.string(),
  Engine_Noise: Yup.string(),
  Axels: Yup.string(),
  Engine_Oil: Yup.string(),
  Engine_Belts: Yup.string(),
  Battery_Condition: Yup.string(),
  Engine_Smoke: Yup.string(),
  Gear_Lever: Yup.string(),
  Exhaust: Yup.string(),
  Radiator_Fan: Yup.string(),
  Coolant: Yup.string(),
  Engine_Idling: Yup.string(),
  Gear_Shifting: Yup.string(),
  Silencer: Yup.string(),
  Engine_Comment: Yup.string(),
});

export const EngineAndTransmissionDefaultValues = {
  Radiator_Condition: 'no_visible_fault',
  Engine_Noise: 'no_visible_fault',
  Axels: 'no_visible_fault',
  Engine_Oil: 'no_visible_fault',
  Engine_Belts: 'no_visible_fault',
  Battery_Condition: 'no_visible_fault',
  Engine_Smoke: 'white',
  Gear_Lever: 'no_visible_fault',
  Exhaust: 'no_visible_fault',
  Radiator_Fan: 'no_visible_fault',
  Coolant: 'no_visible_fault',
  Engine_Idling: 'no_visible_fault',
  Gear_Shifting: 'no_visible_fault',
  Silencer: 'no_visible_fault',
  Engine_Comment: '',
};

const fields = [
  { name: 'Radiator_Condition', label: 'Radiator Condition'},
  { name: 'Engine_Noise', label: 'Engine Noise', options: ENGINE_NOISE_OPTIONS },
  { name: 'Axels', label: 'Axels' },
  { name: 'Engine_Oil', label: 'Engine Oil' },
  { name: 'Engine_Belts', label: 'Engine_Belts'},
  { name: 'Engine_Smoke', label: 'Engine Smoke', options: ENGINE_SMOKE_OPTIONS},
  { name: 'Gear_Lever', label: 'Gear Lever'},
  { name: 'Exhaust', label: 'Exhaust'},
  { name: 'Radiator_Fan', label: 'Radiator Fan'},
  { name: 'Coolant', label: 'Coolant'},
  { name: 'Engine_Idling', label: 'Engine Idling'},
  { name: 'Gear_Shifting', label: 'Gear Shifting'},
  { name: 'Silencer', label: 'Silencer'},
];

export default function EngineAndTransmissionStep({ errors }) {
  return (
    <Stack spacing={3}>
      {!!errors.afterSubmit && <Alert severity="error">{errors.afterSubmit.message}</Alert>}
      <Box
        rowGap={2}
        columnGap={3}
        display="grid"
        gridTemplateColumns={{
          sm: 'repeat(1, 1fr)',
          md: 'repeat(2, 1fr)',
        }}
      >
        { fields.map(field => renderAddCarSelect({...field, options: field.options || ENGINE_AND_TRANSMISSION_OPTIONS })) }
        <RHFTextField name="Engine_Comment" label="Comments" multiline />
      </Box>
  </Stack>);
}
