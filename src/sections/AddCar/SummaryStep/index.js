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
const SPECIFICATIONS = ["GCC", "American", "Other"];

export const SummarySchema = Yup.object().shape({
  year: Yup.string().nullable().required('Year is required'),
  make: Yup.object().nullable().required('Make is required'),
  model: Yup.object().nullable().required('Model is required'),
  trim: Yup.string().nullable().required('Trim is required'),
  mileage: Yup.number('Should be a number').nullable().required('Mileage is required'),
  engine: Yup.object().nullable().required('Engine options are required'),
  body_type: Yup.string(),
  exterior_color: Yup.string().nullable(),
  interios_Color: Yup.string().nullable(),
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
  additional_info: Yup.string(),
});

export const SummaryDefaultValues = {
  year: "",
  make: null,
  model: null,
  trim: null,
  mileage: 0,
  registered_emirates: "",
  engine: "",
  body_type: "",
  exterior_color: null,
  interios_Color: null,
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
  additional_info: "",
};

const mapFormDataToApi = (values) => ( values ? {
  make: values.make?.name || '',
  trim: values.trim || '',
  model: values.model?.name || '',
  year: values.year,
}: {})

export default function SummaryStep({ errors, watch, setValue }) {
  const values = watch();
  const { makes, models, years, trims, engines, exteriorColors, interiorColors } = useAddCarAutocompletes(mapFormDataToApi(values))

  // clear the fields of their dependencies has been changed
  useEffect(() => {
    setValue('model', null);
    setValue('year', null);
    setValue('trim', null);
    setValue('engine', "");
  }, [values.make, setValue]);
  useEffect(() => {
    setValue('year', null);
    setValue('trim', null);
    setValue('engine', "");
  }, [values.model, setValue]);
  useEffect(() => {
    setValue('trim', null);
    setValue('engine', "");
  }, [values.year, setValue]);
  useEffect(() => {
    setValue('engine', "");
  }, [values.year, setValue]);
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
          className='add-car-datepicker'
          shouldDisableYear={year => years.indexOf(fYear(year)) === -1}
        />
        <RHFAutocomplete
          disabled={!values?.model && !values?.make}
          name="trim"
          label="Trim"
          options={trims}
        />
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
          name="body_type"
          label="Body Type"
        >
          {BODY_TYPES_OPTIONS.map(bodyType => <MenuItem key={bodyType.value} value={bodyType.value}>{bodyType.label}</MenuItem>)}
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
          name="interios_Color"
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
        <RHFTextField name="additional_info" label="Additional Information" multiline />
        <RHFCheckbox name="bank_finance" label="Mortgage/Bank Finance" />
      </Box>
  </Stack>);
}
