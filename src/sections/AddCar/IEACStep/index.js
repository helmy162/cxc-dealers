import * as Yup from 'yup';
// @mui
import { Stack, Alert, Box } from '@mui/material';
import { ENGINE_AND_TRANSMISSION_OPTIONS } from '../constants';
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
  { name: 'Dashboard_Condition', label: 'Dashboard Condition Pads'},
  { name: 'Steering_Mounted_Controls', label: 'Steering Mounted Controls' },
  { name: 'Center_Console_Box', label: 'Center Console Box' },
  { name: 'Speedometer_Cluster', label: 'Speedometer Cluster' },
  { name: 'Door_Trim_Panels', label: 'Door Trim Panels'},
  { name: 'Headliner', label: 'Headliner'},
  { name: 'Seat_Controls', label: 'Seat Controls'},
  { name: 'Boot_Trunk_Area', label: 'Boot Trunk Area'},
  { name: 'Central_Lock_Operation', label: 'Central Lock Operation'},
  { name: 'Music_Multimedia_System', label: 'Music Multimedia System'},
  { name: 'Navigation_Control', label: 'Navigation Control'},
  { name: 'Headlights', label: 'Headlights'},
  { name: 'Tail_Lights', label: 'Tail Lights'},
  { name: 'Sunroof_Condition', label: 'Sunroof Condition'},
  { name: 'Windows_Controls_Condition', label: 'Windows Controls Condition'},
  { name: 'Cruise_Control', label: 'Cruise Control'},
  { name: 'Push_Stop_Button', label: 'Push Stop Button'},
  { name: 'AC_Cooling', label: 'AC Cooling'},
  { name: 'Convertible_Operations', label: 'Convertible Operations'},
  { name: 'AC_Heating', label: 'AC Heating'},
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
        <RHFTextField name="Interior_Comment" label="Comments" multiline />
      </Box>

  </Stack>);
}
