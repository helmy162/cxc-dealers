import * as Yup from 'yup';
// @mui
import { Stack, Alert, Box } from '@mui/material';
import { RHFCheckbox, RHFDatePicker } from 'src/components/hook-form';

// ----------------------------------------------------------------------
export const TyresSchema = Yup.object().shape({
  FrontLeft: Yup.string(),
  FrontRight: Yup.string(),
  RearLeft: Yup.string(),
  RearRight: Yup.string(),
  SpareTyre: Yup.boolean(),
});

export const TyresDefaultValues = {
  FrontLeft: "",
  FrontRight: "",
  RearLeft: "",
  RearRight: "",
  Spare_Tyre: false,
};

const fields = [
  { name: 'FrontLeft',label: 'Front Left' },
  { name: 'FrontRight',label: 'Front Right' },
  { name: 'RearLeft',label: 'Rear Left' },
  { name: 'RearRight',label: 'Rear Right' }
]

export default function TyresStep() {
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
        { fields.map(field => <RHFDatePicker
          name={field.name}
          views={['year']}
          label={field.label}
          openTo="year"
          disableFuture
          key={field.name}
        />) }
        <RHFCheckbox name='Spare_Tyre' label={'Spare tyre'} />
      </Box>
  </Stack>);
}
