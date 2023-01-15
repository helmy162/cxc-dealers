import * as Yup from 'yup';
// @mui
import { Stack, Alert, Box, MenuItem } from '@mui/material';
import { renderAddCarSelect, renderAddCarSwitch } from 'src/utils/forms';
import { RHFSelect, RHFSwitch, RHFTextField } from 'src/components/hook-form';

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
  Premium_Sound_System: Yup.boolean(),
  Heads_Up_Display: Yup.boolean(),
  Aux_Audio_In: Yup.boolean(),
  Bluetooth_System: Yup.boolean(),
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
  Anti_Lock_Brakes_ABS: Yup.boolean(),
  Adaptive_Cruise_Control: Yup.boolean(),
  Power_Steering: Yup.boolean(),
  Triptronic_Gears: Yup.string(),
  Carbon_Fiber_Interior: Yup.boolean(),
  Lane_Change_Assist: Yup.boolean,
  Park_Assist: Yup.boolean(),
  Adaptive_Suspension: Yup.boolean(),
  Height_Control: Yup.boolean(),
  Navigation_System: Yup.boolean(),
  Drives: Yup.string(),
  Sunroof_Type: Yup.string(),
  Wheels_Type: Yup.string(),
  Side_Steps: Yup.boolean(),
  Convertible: Yup.string(),
  Other_features: Yup.string(),
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
  Premium_Sound_System: true,
  Heads_Up_Display: true,
  Aux_Audio_In: true,
  Bluetooth_System: true,
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
  Anti_Lock_Brakes_ABS: true,
  Adaptive_Cruise_Control: true,
  Power_Steering: true,
  Triptronic_Gears: 'working',
  Carbon_Fiber_Interior: true,
  Lane_Change_Assist: true,
  Park_Assist: true,
  Adaptive_Suspension: true,
  Height_Control: true,
  Navigation_System: true,
  Drives: 'no_visible_fault',
  Sunroof_Type: 'sunroof',
  Wheels_Type: '4wd',
  Side_Steps: true,
  Convertible: 'false',
  Other_features: ''
};

const clickBoxes = [
  { name: 'Fog_Lights', label: 'Fog Lights'},
  { name: 'Parking_Sensor', label: 'Parking Sensor'},
  { name: 'Winch', label: 'Winch'},
  { name: 'Roof_Rack', label: 'Roof Rack'},
  { name: 'Spoiler', label: 'Spoiler'},
  { name: 'Dual_Exhaust', label: 'Dual Exhaust'},
  { name: 'Alarm', label: 'Alarm/Anti-heft system'},
  { name: 'Rear_Video', label: 'Rear video entertainment system'},
  { name: 'Premium_Sound_System', label: 'Premium Sound system'},
  { name: 'Heads_Up_Display', label: 'Heads Up Display'},
  { name: 'Aux_Audio_In', label: 'Aux Audio In'},
  { name: 'Bluetooth_System', label: 'Bluetooth'},
  { name: 'Climate_Control', label: 'Climate Control'},
  { name: 'Keyless_Entry', label: 'Keyless Entry'},
  { name: 'Keyless_Start', label: 'Keyless Start'},
  { name: 'Leather_Seats', label: 'Leather Seats'},
  { name: 'Racing_Seats', label: 'Racing Seats'},
  { name: 'Cooled_Seats', label: 'Cooled Seats'},
  { name: 'Heated_Seats', label: 'Heated Seats'},
  { name: 'Power_Seats', label: 'Power Seats'},
  { name: 'Power_Locks', label: 'Power Locks'},
  { name: 'Power_Mirrors', label: 'Power Mirrors'},
  { name: 'Power_Windows', label: 'Power Windows'},
  { name: 'Memory_Seats', label: 'Memory Seats'},
  { name: 'View_Camera', label: 'View Camera'},
  { name: 'Blind_Spot_Indicator', label: 'Blind Spot Indicator'},
  { name: 'Anti_Lock_Brakes_ABS', label: 'Anti Lock Brakes/ABS'},
  { name: 'Adaptive_Cruise_Control', label: 'Adaptive Cruise Control'},
  { name: 'Power_Steering', label: 'Power Steering'},
];

const moreClickBoxes = [
  { name: 'Carbon_Fiber_Interior', label: 'Carbon Fiber Interior'},
  { name: 'Lane_Change_Assist', label: 'Lane Change Assist'},
  { name: 'Park_Assist', label: 'Park Assist'},
  { name: 'Adaptive_Suspension', label: 'Adaptive Suspension'},
  { name: 'Height_Control', label: 'Height Control'},
  { name: 'Navigation_System', label: 'Navigation System'},
]
export default function CarSpecsStep({ errors }) {
  return (
    <Stack spacing={3}>
      {!!errors.afterSubmit && <Alert severity="error">{errors.afterSubmit.message}</Alert>}
      <Box
        rowGap={2}
        columnGap={3}
        display="grid"
        sx={{marginBottom: '1rem'}}
        gridTemplateColumns={{
          sm: 'repeat(1, 1fr)',
          md: 'repeat(3, 1fr)',
        }}
      >
        { clickBoxes.map(field => renderAddCarSwitch({...field })) }
        <RHFSelect name='Triptronic_Gears' label='Triptronic Gears'>
          <MenuItem value='working'>Working</MenuItem>
          <MenuItem value='not_working'>Not working</MenuItem>
          <MenuItem value='not_available'>Not available</MenuItem>
        </RHFSelect>
        { moreClickBoxes.map(field => renderAddCarSwitch({...field })) }
        { renderAddCarSelect({ name: 'Drives', label: 'Drives' })}
        <RHFSelect name='Sunroof_Type' label='Sunroof Type'>
          <MenuItem value='sunroof'>Sunroof</MenuItem>
          <MenuItem value='panorama'>Panorama</MenuItem>
          <MenuItem value='moonroof'>Moonroof</MenuItem>
        </RHFSelect>
        <RHFSelect name='Wheels_Type' label='Wheels Type'>
          <MenuItem value='2wd'>2wd</MenuItem>
          <MenuItem value='4wd'>4wd</MenuItem>
        </RHFSelect>
        <RHFSwitch name='Side_Steps' label='Side Steps' />
        <RHFSelect name='Convertible' label='Convertible'>
          <MenuItem value='false'>No</MenuItem>
          <MenuItem value='hard_top'>Hard top</MenuItem>
          <MenuItem value='soft_top'>Soft top</MenuItem>
        </RHFSelect>
        <RHFTextField multiline name='Other_Features' label='Other Features' />
      </Box>

  </Stack>);
}
