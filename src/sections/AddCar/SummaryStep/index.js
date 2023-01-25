import * as Yup from 'yup';
// @mui
import { Stack, Alert, Box, MenuItem, Typography } from '@mui/material';

import { RHFAutocomplete, RHFCheckbox, RHFDatePicker, RHFSelect, RHFSwitch, RHFTextField } from '../../../components/hook-form';
import useAddCarAutocompletes from 'src/hooks/useAddCarAutocompletes';
import { isOptionEqualToValue, renderAddCarSelect } from 'src/utils/forms';
import { fYear } from 'src/utils/formatTime';
import EngineCard from './EngineCard';
import { BODY_TYPES_OPTIONS, SERVICE_HISTORY_OPTIONS, MANUALS_OPTIONS, ACCIDENT_HISTORY_OPTIONS } from '../constants';
import { useEffect } from 'react';

// ----------------------------------------------------------------------

const INTERIOR_TYPES = ["Full Leather",	"Fabric",	"Double Ton leather/fabric mix"];
const exteriorColors = ["white", "black", "silver", "gray", "red", "blue", "green", "yellow", "brown", "orange", "other"];
const interiorColors = ["black", "gray", "beige", "brown", "white", "other"];
const SPECIFICATIONS = ["GCC", "American", "Other"];

export const SummarySchema = Yup.object().shape({
  year: Yup.string().nullable().required('Year is required'),
  make: Yup.object().nullable().required('Make is required'),
  model: Yup.object().nullable().required('Model is required'),
  generation: Yup.object().nullable().required('Generation is required'),
  trim: Yup.object().nullable().required('Trim is required'),
  mileage: Yup.number('Should be a number').nullable().required('Mileage is required'),
  engine: Yup.object().nullable().required('Engine options are required'),
  body_type: Yup.string(),
  exterior_color: Yup.string().nullable(),
  interior_color: Yup.string().nullable(),
  interior_type: Yup.string(),
  specification: Yup.string(),
  is_new: Yup.boolean(),
  first_owner: Yup.boolean(),
  keys: Yup.string(),
  service_history: Yup.string(),
  manuals: Yup.string(),
  warranty: Yup.boolean(),
  accident_history: Yup.string(),
  bank_finance: Yup.boolean(),
  car_history_comment: Yup.string(),
});

export const SummaryDefaultValues = {
  year: "",
  make: null,
  model: null,
  generation: null,
  trim: null,
  mileage: 0,
  registered_emirates: "",
  engine: "",
  body_type: "",
  exterior_color: null,
  interior_color: null,
  interior_type: "",
  specification: "",
  is_new: true,
  first_owner: false,
  keys: "",
  service_history: "",
  manuals: "",
  warranty: true,
  accident_history: "",
  bank_finance: false,
  car_history_comment: "",
};

const mapFormDataToApi = (values) => ( values ? {
  make: values.make || '',
  generation: values.generation || '',
  trim: values.trim || '',
  model: values.model || '',
  year: values.year,
}: {})

export default function SummaryStep({ errors, watch, setValue }) {
  const values = watch();
  const { makes, models, generations, trims, engines } = useAddCarAutocompletes(mapFormDataToApi(values))
  // clear the fields of their dependencies has been changed
  useEffect(() => {
    setValue('model', null);
    setValue('generation', null);
    setValue('year', null);
    setValue('trim', null);
    setValue('engine', "");
  }, [values.make, setValue]);
  useEffect(() => {
    setValue('generation', null);
    setValue('year', null);
    setValue('trim', null);
    setValue('engine', "");
  }, [values.model, setValue]);
  useEffect(() => {
    setValue('trim', null);
    setValue('engine', "");
  }, [values.year, values.generation, setValue]);
  useEffect(() => {
    setValue('engine', "");
  }, [values.year, setValue]);
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
        <RHFAutocomplete
          disabled={!values?.model}
          name="generation"
          label="Generation"
          options={generations}
          isOptionEqualToValue={isOptionEqualToValue}
          getOptionLabel={(option) => option.name ?? ''}
        />
        <RHFDatePicker
          name="year"
          views={['year']}
          label="Year"
          openTo="year"
          className='add-car-datepicker'
          shouldDisableYear={year => fYear(year) < values?.generation?.yearFrom || fYear(year) > values?.generation?.yearTo || fYear(year) > new Date().getFullYear()}
          disabled={!values?.model || !values?.make || !values?.generation }
        />
        <RHFSelect
          disabled={!values?.model || !values?.make || !values?.generation }
          name="body_type"
          label="Body Type"
        >
          {BODY_TYPES_OPTIONS.map(bodyType => <MenuItem key={bodyType.value} value={bodyType.value}>{bodyType.label}</MenuItem>)}
        </RHFSelect>
        <RHFAutocomplete
          disabled={!values?.model || !values?.make || !values?.generation }
          name="trim"
          label="Trim"
          isOptionEqualToValue={isOptionEqualToValue}
          options={trims}
          getOptionLabel={(option) => option.trim + ' ' +option.series ?? ''}
        />
        <RHFSelect
          disabled={!values?.model && !values?.make}
          name="engine"
          label="Engine"
          SelectProps={{
            renderValue: (engine) => <EngineCard obj={engine} />
          }}
        >
          <MenuItem key={engines.id} value={engines}><EngineCard obj={engines} /></MenuItem>
        </RHFSelect>
        <RHFTextField
          name="mileage"
          label="Mileage (km)"
          type="number"
        />
        <RHFTextField
          name="registered_emirates"
          label="Registered Emirates"
        />
        
        
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
          name="interior_type"
          label="Interior Type"
        >
          {INTERIOR_TYPES.map(key => <MenuItem key={key} value={key}>{key}</MenuItem>)}
        </RHFSelect>

        <RHFAutocomplete
          disabled={!values?.model && !values?.make && !values?.trim}
          name="exterior_color"
          label="Exterior Color"
          options={exteriorColors}
        />

        <RHFAutocomplete
          disabled={!values?.model && !values?.make && !values?.trim}
          name="interior_color"
          label="Interior Color"
          options={interiorColors}
        />
        <RHFSwitch name="is_new" label="Is new" />
        <RHFSwitch name="first_owner" label="First owner" />
      </Box>
      <Typography variant="h3">Car history</Typography>
      <Box
        rowGap={2}
        columnGap={3}
        display="grid"
        gridTemplateColumns={{
          sm: 'repeat(1, 1fr)',
          md: 'repeat(3, 1fr)',
        }}
        sx={{marginBottom: '1rem'}}
      >
        { renderAddCarSelect({ name: 'service_history', label: 'Service History', options: SERVICE_HISTORY_OPTIONS }) }
        { renderAddCarSelect({ name: 'manuals', label: 'Manuals', options: MANUALS_OPTIONS })}
        <RHFCheckbox name="warranty" label="Warranty" />
        { renderAddCarSelect({ name: 'accident_history', label: 'Accident History', options: ACCIDENT_HISTORY_OPTIONS })}
        <RHFCheckbox name="bank_finance" label="Mortgage/Bank Finance" />
        <RHFTextField name="car_history_comment" label="Additional Information" multiline />
      </Box>
  </Stack>);
}
