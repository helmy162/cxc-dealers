import * as Yup from 'yup';
// @mui
import { Stack, Alert, Box, Typography, MenuItem } from '@mui/material';

import { RHFAutocomplete, RHFDatePicker, RHFSelect, RHFSwitch, RHFTextField } from '../../components/hook-form';
import useAddCarAutocompletes from 'src/hooks/useAddCarAutocompletes';
import isOptionEqualToValue from 'src/utils/forms';
import { fYear } from 'src/utils/formatTime';
import EngineCard from './EngineCard';

// ----------------------------------------------------------------------

const INTERIOR_TYPES = ["Full Leather",	"Fabric",	"Double Ton leather/fabric mix"];
const SPECIFICATIONS = ["GCC", "American", "Other"];

export const SummarySchema = Yup.object().shape({
  year: Yup.string().nullable().required('Year is required'),
  make: Yup.object().nullable().required('Make is required'),
  model: Yup.object().nullable().required('Model is required'),
  trim: Yup.object().nullable().required('Trim is required'),
  mileage: Yup.number('Should be a number').nullable().required('Mileage is required'),
  engine: Yup.object().nullable().required('Engine options are required'),
});

export const SummaryDefaultValues = {
  year: "",
  make: null,
  model: null,
  trim: null,
  mileage: 0,
  registeredEmirates: "",
  engine: "",
  exteriorColor: null,
  interiorColor: null,
  interiorType: "",
  specification: "",
  isNew: true,
  firstOwner: false,
  keys: "",
};

const mapFormDataToApi = (values) => ( values ? {
  make: values.make?.name || '',
  trim: values.trim?.name || '',
  model: values.model?.name || '',
  year: values.year,
}: {})

export default function SummaryStep({ errors, watch }) {
  const values = watch();
  const { makes, models, years, trims, engines, exteriorColors, interiorColors } = useAddCarAutocompletes(mapFormDataToApi(values))

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
        <RHFAutocomplete
          name="make"
          label="Make"
          options={makes}
          isOptionEqualToValue={isOptionEqualToValue}
          getOptionLabel={(option) => option.name ?? ''}
        />
        <RHFAutocomplete
          disabled={!values?.make}
          name="model"
          label="Model"
          options={models}
          isOptionEqualToValue={isOptionEqualToValue}
          getOptionLabel={(option) => option.name ?? ''}
        />
        <RHFDatePicker
          name="year"
          views={['year']}
          label="Year"
          openTo="year"
          disableFuture
          shouldDisableYear={year => years.indexOf(fYear(year)) === -1}
        />
        <RHFAutocomplete
          disabled={!values?.model && !values?.make}
          name="trim"
          label="Trim"
          options={trims}
          isOptionEqualToValue={isOptionEqualToValue}
          renderOption={(option, obj) =>
            <Box key={obj.id} {...option} flexWrap="wrap">
              <Typography variant="subtitle2" gutterBottom>{obj.name}</Typography>
              <Typography variant="caption" display="block" gutterBottom>{obj.description}</Typography>
            </Box>
          }
          getOptionLabel={option => option.name}
        />

        <RHFTextField
          name="mileage"
          label="Mileage (km)"
          type="number"
        />

        <RHFTextField
          name="registeredEmirates"
          label="Registered Emirates"
        />

        <RHFSelect
          disabled={!values?.model && !values?.make}
          name="engine"
          label="Engine"
          SelectProps={{
            renderValue: (engine) => <EngineCard obj={engine} />
          }}
        >
          {engines.map(engine => <MenuItem key={engine.id} value={engine}><EngineCard obj={engine} /></MenuItem>)}
        </RHFSelect>
        <RHFSelect
          disabled={!values?.model && !values?.make}
          name="keys"
          label="No. of keys"
        >
          {[1, 2, 3].map(key => <MenuItem key={key} value={key}>{key}</MenuItem>)}
        </RHFSelect>
        <RHFSelect
          disabled={!values?.model && !values?.make}
          name="specification"
          label="Specification"
        >
          {SPECIFICATIONS.map(key => <MenuItem key={key} value={key}>{key}</MenuItem>)}
        </RHFSelect>
        <RHFSelect
          disabled={!values?.model && !values?.make}
          name="interiorType"
          label="Interior Type"
        >
          {INTERIOR_TYPES.map(key => <MenuItem key={key} value={key}>{key}</MenuItem>)}
        </RHFSelect>

        <RHFAutocomplete
          disabled={!values?.model && !values?.make && !values?.trim}
          name="exteriorColor"
          label="Exterior Color"
          options={exteriorColors}
        />

        <RHFAutocomplete
          disabled={!values?.model && !values?.make && !values?.trim}
          name="interiorColor"
          label="Interior Color"
          options={interiorColors}
        />
        <RHFSwitch name="isNew" label="Is new" />
        <RHFSwitch name="firstOwner" label="First owner" />
      </Box>

  </Stack>);
}
