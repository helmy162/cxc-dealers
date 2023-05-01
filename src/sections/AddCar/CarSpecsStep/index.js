import * as Yup from 'yup';
// @mui
import { Stack, Alert, Box, MenuItem } from '@mui/material';
import { renderAddCarSelect, renderAddCarSwitch } from 'src/utils/forms';
import { RHFSelect, RHFSwitch, RHFTextField } from 'src/components/hook-form';
import {ENGINE_AND_TRANSMISSION_OPTIONS,
  Drives,
  TiptronicGears,
  SunroofType,
  WheelsType,
  ConvertibleType } from './constants';

// ----------------------------------------------------------------------
export const CarSpecsSchema = Yup.object().shape({
  Fog_Lights: Yup.boolean(),
  Parking_Sensor: Yup.boolean(),
  Winch: Yup.boolean(),
  Roof_Rack: Yup.boolean(),
  Spoiler: Yup.boolean(),
  Dual_Exhaust: Yup.boolean(),
  Alarm: Yup.boolean(),
  Rear_Video: Yup.boolean(),
  Premium_Sound: Yup.boolean(),
  Heads_Up_Display: Yup.boolean(),
  Aux_Audio: Yup.boolean(),
  Bluetooth: Yup.boolean(),
  Climate_Control: Yup.boolean(),
  Keyless_Entry: Yup.boolean(),
  Keyless_Start: Yup.boolean(),
  Leather_Seats: Yup.boolean(),
  Racing_Seats: Yup.boolean(),
  Cooled_Seats: Yup.boolean(),
  Heated_Seats: Yup.boolean(),
  Power_Seats: Yup.boolean(),
  Power_Locks: Yup.boolean(),
  Power_Mirrors: Yup.boolean(),
  Power_Windows: Yup.boolean(),
  Memory_Seats: Yup.boolean(),
  View_Camera: Yup.boolean(),
  Blind_Spot_Indicator: Yup.boolean(),
  Anti_Lock: Yup.boolean(),
  Adaptive_Cruise_Control: Yup.boolean(),
  Power_Steering: Yup.boolean(),
  	Trip_Gears: Yup.string(),
  Carbon_Fiber_Interior: Yup.boolean(),
  Line_Change_Assist: Yup.boolean(),
  Park_Assist: Yup.boolean(),
  Adaptive_Suspension: Yup.boolean(),
  Height_Control: Yup.boolean(),
  Navigation_System: Yup.boolean(),
  Drives: Yup.string(),
  Sunroof_Type: Yup.string(),
  Wheel_Type: Yup.string(),
  Side_Steps: Yup.boolean(),
  Convertible: Yup.string(),
  Other_Features: Yup.string(),
});

export const CarSpecsDefaultValues = {
  Fog_Lights: true,
  Parking_Sensor: true,
  Winch: true,
  Roof_Rack: true,
  Spoiler: true,
  Dual_Exhaust: true,
  Alarm: true,
  Rear_Video: true,
  Premium_Sound: true,
  Heads_Up_Display: true,
  Aux_Audio: true,
  Bluetooth: true,
  Climate_Control: true,
  Keyless_Entry: true,
  Keyless_Start: true,
  Leather_Seats: true,
  Racing_Seats: true,
  Cooled_Seats: true,
  Heated_Seats: true,
  Power_Seats: true,
  Power_Locks: true,
  Power_Mirrors: true,
  Power_Windows: true,
  Memory_Seats: true,
  View_Camera: true,
  Blind_Spot_Indicator: true,
  Anti_Lock: true,
  Adaptive_Cruise_Control: true,
  Power_Steering: true,
  	Trip_Gears: 'working',
  Carbon_Fiber_Interior: true,
  Line_Change_Assist: true,
  Park_Assist: true,
  Adaptive_Suspension: true,
  Height_Control: true,
  Navigation_System: true,
  Drives: 'average',
  Sunroof_Type: 'sunroof',
  Wheel_Type: '4wd',
  Side_Steps: true,
  Convertible: 'false',
  Other_Features: '',
  Tiptronic_Gears: 'working',
  
};


const fields = [
  { name: 'Drives', label: 'Drives', options: Drives},
  { name: 'Sunroof_Type', label: 'Sunroof Type', options: SunroofType},
  { name: 'Convertible', label: 'Convertible', options: ConvertibleType},
];

export default function CarSpecsStep() {
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
        <RHFTextField multiline name='Other_Features' label='Other Features' />
      </Box>

  </Stack>);
}
