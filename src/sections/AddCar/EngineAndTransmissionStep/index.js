import * as Yup from 'yup';
// @mui
import { Stack, Alert, Box, MenuItem } from '@mui/material';
import { RHFSelect } from 'src/components/hook-form';
import { ENGINE_AND_TRANSMISSION_OPTIONS, ENGINE_SMOKE_OPTIONS, ENGINE_NOISE_OPTIONS } from './constants';

// ----------------------------------------------------------------------

export const EngineAndTransmissionSchema = Yup.object().shape({
  Radiator_Condition: Yup.string(),
  Engine_Noise: Yup.string(),
  Engine_Belts: Yup.string(),
  Battery_Condition: Yup.string(),
  Engine_Smoke: Yup.string(),
  Gear_Lever: Yup.string(),
  Radiator_Fan: Yup.string(),
  Coolant: Yup.string(),
  Engine_Idling: Yup.string(),
  Gear_Shifting: Yup.string(),
  Silencer: Yup.string(),
});

export const EngineAndTransmissionDefaultValues = {
  Radiator_Condition: 'no_visible_fault',
  Engine_Noise: 'no_visible_fault',
  Engine_Belts: 'no_visible_fault',
  Battery_Condition: 'no_visible_fault',
  Engine_Smoke: 'white',
  Gear_Lever: 'no_visible_fault',
  Radiator_Fan: 'no_visible_fault',
  Coolant: 'no_visible_fault',
  Engine_Idling: 'no_visible_fault',
  Gear_Shifting: 'no_visible_fault',
  Silencer: 'no_visible_fault',
};

const renderOptions = ((options = ENGINE_AND_TRANSMISSION_OPTIONS) => options.map(option => <MenuItem value={option.value} key={option.value}>{option.label}</MenuItem>));

export default function EngineAndTransmissionStep({ errors, watch }) {
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
        <RHFSelect name="Radiator_Condition" label="Radiator Condition" >
          {renderOptions()}
        </RHFSelect>
        <RHFSelect name="Engine_Noise" label="Engine Noise" >
          {renderOptions(ENGINE_NOISE_OPTIONS)}
        </RHFSelect>
        <RHFSelect name="Engine_Belts" label="Engine Belts">
          {renderOptions()}
        </RHFSelect>
        <RHFSelect name="Battery_Condition" label="Battery Condition">
          {renderOptions()}
        </RHFSelect>
        <RHFSelect name="Engine_Smoke" label="Engine Smoke">
          {renderOptions(ENGINE_SMOKE_OPTIONS)}
        </RHFSelect>
        <RHFSelect name="Gear_Lever" label="Gear Lever"
        >
          {renderOptions()}  
        </RHFSelect>
        <RHFSelect name="Radiator_Fan" label="Radiator Fan" >
          {renderOptions()}
        </RHFSelect>
        <RHFSelect name="Coolant" label="Coolant" >
          {renderOptions()}
        </RHFSelect>
        <RHFSelect name="Engine_Idling" label="Engine Idling">
          {renderOptions()}
        </RHFSelect>
        <RHFSelect name="Gear_Shifting" label="Gear Shifting" >
          {renderOptions()}
        </RHFSelect>
        <RHFSelect name="Silencer" label="Silencer" >
          {renderOptions()}
        </RHFSelect>
      </Box>

  </Stack>);
}
