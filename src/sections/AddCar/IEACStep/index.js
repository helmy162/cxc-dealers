import * as Yup from 'yup';
// @mui
import { Stack, Alert, Box } from '@mui/material';
import { ENGINE_AND_TRANSMISSION_OPTIONS,
  DASHBOARD_CONDITION_PADS_OPTIONS,
  STEERING_MOUNTED_CONTROLS_OPTIONS,
  CENTER_CONSOLE_BOX_OPTIONS,
  SPEEDOMETER_CLUSTER_OPTIONS,
  DOOR_TRIM_PANELS_OPTIONS,
  HEADLINER_OPTIONS,
  SEAT_CONTROLS_OPTIONS,
  BOOT_TRUNK_AREA_OPTIONS,
  CENTRAL_LOCK_OPERATION_OPTIONS,
  MUSIC_MULTIMEDIA_SYSTEM_OPTIONS,
  NAVIGATION_CONTROL_OPTIONS,
  HEADLIGHTS_OPTIONS,
  TAIL_LIGHTS_OPTIONS,
  SUNROOF_OPTIONS,
  WINDOWS_CONTROLS_OPTIONS,
  CRUISE_CONTROL_OPTIONS,
  PUSH_START_STOP_BUTTON_OPTIONS,
  AC_COOLING_OPTIONS,
  CONVERTIBLE_OPERATIONS_OPTIONS,
  AC_HEATING_OPTIONS } from './constants';
import { renderAddCarSelect } from 'src/utils/forms';
import { RHFTextField } from 'src/components/hook-form';

// ----------------------------------------------------------------------
export const IEACSchema = Yup.object().shape({
  Dashboard_Condition: Yup.string(),
  Steering_Mounted_Controls: Yup.string(),
  Center_Console_Box: Yup.string(),
  Speedometer_Cluster: Yup.string(),
  Door_Trim_Panels: Yup.string(),
  Headliner: Yup.string(),
  Seat_Controls: Yup.string(),
  Boot_Trunk_Area: Yup.string(),
  Central_Lock_Operation: Yup.string(),
  Music_Multimedia_System: Yup.string(),
  Navigation_Control: Yup.string(),
  Headlights: Yup.string(),
  Tail_Lights: Yup.string(),
  Sunroof_Condition: Yup.string(),
  Windows_Controls_Condition: Yup.string(),
  Cruise_Control: Yup.string(),
  Push_Stop_Button: Yup.string(),
  AC_Cooling: Yup.string(),
  Convertible_Operations: Yup.string(),
  AC_Heating: Yup.string(),
  Interior_Comment: Yup.string(),
});

export const IEACDefaultValues = {
  Dashboard_Condition: "no_visible_fault",
  Steering_Mounted_Controls: "no_visible_fault",
  Center_Console_Box: "no_visible_fault",
  Speedometer_Cluster: "no_visible_fault",
  Door_Trim_Panels: "no_visible_fault",
  Headliner: "no_visible_fault",
  Seat_Controls: "no_visible_fault",
  Boot_Trunk_Area: "no_visible_fault",
  Central_Lock_Operation: "no_visible_fault",
  Music_Multimedia_System: "no_visible_fault",
  Navigation_Control: "no_visible_fault",
  Headlights: "no_visible_fault",
  Tail_Lights: "no_visible_fault",
  Sunroof_Condition: "no_visible_fault",
  Windows_Controls_Condition: "no_visible_fault",
  Cruise_Control: "no_visible_fault",
  Push_Stop_Button: "no_visible_fault",
  AC_Cooling: "no_visible_fault",
  Convertible_Operations: "no_visible_fault",
  AC_Heating: "no_visible_fault",
  Interior_Comment: "",
};

const fields = [
  { name: 'Dashboard_Condition', label: 'Dashboard Condition', options: DASHBOARD_CONDITION_PADS_OPTIONS },
  { name: 'Steering_Mounted_Controls', label: 'Steering Mounted Controls', options: STEERING_MOUNTED_CONTROLS_OPTIONS },
  { name: 'Center_Console_Box', label: 'Center Console Box', options: CENTER_CONSOLE_BOX_OPTIONS },
  { name: 'Speedometer_Cluster', label: 'Speedometer Cluster', options: SPEEDOMETER_CLUSTER_OPTIONS },
  { name: 'Door_Trim_Panels', label: 'Door Trim Panels', options: DOOR_TRIM_PANELS_OPTIONS },
  { name: 'Headliner', label: 'Headliner', options: HEADLINER_OPTIONS },
  { name: 'Seat_Controls', label: 'Seat Controls', options: SEAT_CONTROLS_OPTIONS },
  { name: 'Boot_Trunk_Area', label: 'Boot Trunk Area', options: BOOT_TRUNK_AREA_OPTIONS },
  { name: 'Central_Lock_Operation', label: 'Central Lock Operation', options: CENTRAL_LOCK_OPERATION_OPTIONS },
  { name: 'Music_Multimedia_System', label: 'Music Multimedia System', options: MUSIC_MULTIMEDIA_SYSTEM_OPTIONS },
  { name: 'Navigation_Control', label: 'Navigation Control', options: NAVIGATION_CONTROL_OPTIONS },
  { name: 'Headlights', label: 'Headlights', options: HEADLIGHTS_OPTIONS },
  { name: 'Tail_Lights', label: 'Tail Lights', options: TAIL_LIGHTS_OPTIONS },
  { name: 'Sunroof_Condition', label: 'Sunroof Condition', options: SUNROOF_OPTIONS },
  { name: 'Windows_Controls_Condition', label: 'Windows Controls Condition', options: WINDOWS_CONTROLS_OPTIONS },
  { name: 'Cruise_Control', label: 'Cruise Control', options: CRUISE_CONTROL_OPTIONS },
  { name: 'Push_Stop_Button', label: 'Push Stop Button', options: PUSH_START_STOP_BUTTON_OPTIONS },
  { name: 'AC_Cooling', label: 'AC Cooling', options: AC_COOLING_OPTIONS },
  { name: 'Convertible_Operations', label: 'Convertible Operations', options: CONVERTIBLE_OPERATIONS_OPTIONS },
  { name: 'AC_Heating', label: 'AC Heating', options: AC_HEATING_OPTIONS },
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
        <RHFTextField name="Interior_Comment" label="Comments" multiline />
      </Box>

  </Stack>);
}
