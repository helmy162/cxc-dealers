import * as Yup from 'yup';
// @mui
import { Stack, Alert, Box, MenuItem } from '@mui/material';
import { renderAddCarSelect, renderAddCarSwitch } from 'src/utils/forms';
import { RHFSelect, RHFSwitch, RHFTextField } from 'src/components/hook-form';
import { ENGINE_AND_TRANSMISSION_OPTIONS } from '../constants';

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
  Cruise_Control: Yup.boolean(),
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
  Cruise_Control: true,
  Power_Steering: true,
  	Trip_Gears: 'working',
  Carbon_Fiber_Interior: true,
  Line_Change_Assist: true,
  Park_Assist: true,
  Adaptive_Suspension: true,
  Height_Control: true,
  Navigation_System: true,
  Drives: 'no_visible_fault',
  Sunroof_Type: 'sunroof',
  Wheel_Type: '4wd',
  Side_Steps: true,
  Convertible: 'false',
  Other_Features: ''
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
  { name: 'Premium_Sound', label: 'Premium Sound system'},
  { name: 'Heads_Up_Display', label: 'Heads Up Display'},
  { name: 'Aux_Audio', label: 'Aux Audio In'},
  { name: 'Bluetooth', label: 'Bluetooth'},
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
  { name: 'Anti_Lock', label: 'Anti Lock Brakes/ABS'},
  { name: 'Cruise_Control', label: 'Adaptive Cruise Control'},
  { name: 'Power_Steering', label: 'Power Steering'},
  { name: 'Side_Steps', label: 'Side Steps'},
  { name: 'Carbon_Fiber_Interior', label: 'Carbon Fiber Interior'},
  { name: 'Line_Change_Assist', label: 'Line Change Assist'},
  { name: 'Park_Assist', label: 'Park Assist'},
  { name: 'Adaptive_Suspension', label: 'Adaptive Suspension'},
  { name: 'Height_Control', label: 'Height Control'},
  { name: 'Navigation_System', label: 'Navigation System'},
];

export default function CarSpecsStep({ errors }) {
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
        { clickBoxes.map(field => renderAddCarSwitch({...field })) }
        { renderAddCarSelect({ name: 'Drives', label: 'Drives', options: ENGINE_AND_TRANSMISSION_OPTIONS })}
        <RHFSelect name='	Trip_Gears' label='Triptronic Gears'>
          <MenuItem value='working'>Working</MenuItem>
          <MenuItem value='not_working'>Not working</MenuItem>
          <MenuItem value='not_available'>Not available</MenuItem>
        </RHFSelect>
        <RHFSelect name='Sunroof_Type' label='Sunroof Type'>
          <MenuItem value='sunroof'>Sunroof</MenuItem>
          <MenuItem value='panorama'>Panorama</MenuItem>
          <MenuItem value='moonroof'>Moonroof</MenuItem>
        </RHFSelect>
        <RHFSelect name='Wheel_Type' label='Wheels Type'>
          <MenuItem value='2wd'>2wd</MenuItem>
          <MenuItem value='4wd'>4wd</MenuItem>
        </RHFSelect>
        <RHFSelect name='Convertible' label='Convertible'>
          <MenuItem value='false'>No</MenuItem>
          <MenuItem value='hard_top'>Hard top</MenuItem>
          <MenuItem value='soft_top'>Soft top</MenuItem>
        </RHFSelect>
        <RHFTextField multiline name='Other_Features' label='Other Features' />
      </Box>

  </Stack>);
}
