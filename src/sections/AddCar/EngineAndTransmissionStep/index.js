import * as Yup from 'yup';
// @mui
import { Stack, Alert, Box } from '@mui/material';
import { ENGINE_AND_TRANSMISSION_OPTIONS, 
  radiatorConditionOptions,
  silencerOptions,
  axelsOptions,
  radiatorFanOptions,
  engineIdlingOptions,
  engineNoiseOptions,
  engineSmokeOptions,
  coolantOptions,
  transmissionConditionOptions,
  oilLeaksOptions,
  engineGroupOptions,
  hosesConditionOptions,
  shiftInterlockOptions} from './constants';
import { renderAddCarSelect, renderAddCarSwitch } from 'src/utils/forms';
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
  { name: 'Radiator_Condition', label: 'Radiator Condition', options: radiatorConditionOptions},
  { name: 'Silencer', label: 'Silencer', options: silencerOptions}, 
  { name: 'Axels', label: 'Axels', options: axelsOptions },
  { name: 'Radiator_Fan', label: 'Radiator Fan', options: radiatorFanOptions},
  { name: 'Engine_Idling', label: 'Engine Idling', options: engineIdlingOptions},
  { name: 'Engine_Noise', label: 'Engine Noise', options: engineNoiseOptions},
  { name: 'Engine_Smoke', label: 'Engine Smoke', options: engineSmokeOptions},
  { name: 'Coolant', label: 'Coolant', options: coolantOptions},
  { name: 'Transmission_Condition', label: 'Transmission Condition', options: transmissionConditionOptions},
  { name: 'Shift_Interlock_Condition', label: 'Shift Interlock (4x4) Condition', options: shiftInterlockOptions },
  { name: 'Oil_Leaks', label: 'Oil Leaks', options: oilLeaksOptions},
  { name: 'Engine_Group', label: 'Engine Group', options: engineGroupOptions},
  { name: 'Hoses_and_Pipes_Condition', label: 'Hoses and Pipes Condition', options: hosesConditionOptions},
];

export default function EngineAndTransmissionStep() {
  return (
    <Stack spacing={3}>
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
        {renderAddCarSwitch({ name: 'Warning_Signal', label: 'Warning Signal' })}
      </Box>
  </Stack>);
}
