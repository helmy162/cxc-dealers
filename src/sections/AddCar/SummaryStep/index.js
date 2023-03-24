import * as Yup from 'yup';
// @mui
import { Stack, Alert, Box, MenuItem, Typography, InputAdornment} from '@mui/material';

import { RHFAutocomplete, RHFCheckbox, RHFDatePicker, RHFSelect, RHFSwitch, RHFTextField } from '../../../components/hook-form';
import useAddCarAutocompletes from 'src/hooks/useAddCarAutocompletes';
import { hasSameName, isOptionEqualToValue, renderAddCarSelect } from 'src/utils/forms';
import { fYear } from 'src/utils/formatTime';
import EngineCard from './EngineCard';
import { BODY_TYPES_OPTIONS, SERVICE_HISTORY_OPTIONS, MANUALS_OPTIONS, ACCIDENT_HISTORY_OPTIONS, WARRANTY_OPTIONS, BANK_FINANCE_OPTIONS } from '../constants';


// ----------------------------------------------------------------------

const INTERIOR_TYPES = ["Full Leather",	"Fabric",	"Double Ton leather/fabric mix"];
const exteriorColors = ["White", "Black", "Silver", "Gray", "Red", "Blue", "Green", "Yellow", "Brown", "Orange", "Other"];
const interiorColors = ["Black", "Gray", "Beige", "Brown", "White", "Other"];
const firstOwnerOptions = ["Yes", "No", "Unknown"];
const UAEEmirates = ["Abu Dhabi", "Ajman", "Al Ain", "Dubai", "Fujairah", "Ras Al Khaimah", "Sharjah", "Umm Al Quwain"];
const SPECIFICATIONS = ["GCC", "American", "Other"];

export const SummarySchema = Yup.object().shape({
  seller_id: Yup.string().required('Seller ID is required'),
  seller_price: Yup.number('Should be a number').required('Seller price is required'),
  year: Yup.string().nullable().required('Year is required'),
  make: Yup.object().nullable().required('Make is required'),
  model: Yup.object().nullable().required('Model is required'),
  generation: Yup.object().nullable().required('Generation is required'),
  trim: Yup.object().nullable().required('Trim is required'),
  mileage: Yup.number('Should be a number').nullable().required('Mileage is required'),
  engine: Yup.object().nullable().required('Engine options are required'),
  registered_emirates: Yup.string().nullable().required('Registered emirates is required'),
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
  seller_id: null,
  seller_price: 0,
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
  trim: values.trim || null,
  model: values.model || '',
  year: values.year,
}: {})

export default function SummaryStep({ errors, watch, setValue, resetField }) {
  const values = watch();
  const { makes, models, generations, trims, engines } = useAddCarAutocompletes(mapFormDataToApi(values))
  return (
    <Stack spacing={3}>
      <Typography variant="h4">Seller Info</Typography>
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
        <RHFTextField
          name="seller_id"
          label="Seller ID"
          type="number"
        />
        <RHFTextField
          name="seller_price"
          label="Seller Price"
          placeholder="0.00"
          InputLabelProps={{ shrink: true }}
          InputProps={{
              endAdornment: (
              <InputAdornment position="start">
                  <Box component="span" sx={{ color: 'text.disabled' }}>
                  AED
                  </Box>
              </InputAdornment>
              ),
              type: 'number',
          }}
        />
      </Box>
      <Typography variant="h4">Car Info</Typography>
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
          options={makes.map(carMake => carMake.name)}
          isOptionEqualToValue={isOptionEqualToValue}
          getOptionLabel={(option) => option ?? ''}
          onChange={(e, value) => {
            resetField("model");
            resetField("generation");
            resetField("year");
            resetField("trim");
            resetField("engine");
            setValue("make", value);
          } }
        />
        <RHFAutocomplete
          disabled={!values?.make}
          name="model"
          label="Model"
          options={models.map(carModel => carModel.name)}
          isOptionEqualToValue={isOptionEqualToValue}
          getOptionLabel={(option) => option ?? ''}
          onChange={(e, value) => {
            resetField("generation");
            resetField("year");
            resetField("trim");
            resetField("engine");
            setValue("model", value);
          } }
        />
        <RHFAutocomplete
          disabled={!values?.model}
          name="generation"
          label="Generation"
          options={generations.map(carGeneration => carGeneration.name)}
          isOptionEqualToValue={isOptionEqualToValue}
          placeholder="Select Generation"
          getOptionLabel={(option) => {
            const thisGeneration = generations.find(carGeneration => carGeneration.name === option)
            return thisGeneration? (thisGeneration?.name + ' [ ' + thisGeneration.yearFrom + ' to ' + (thisGeneration.yearTo?? 'Now') + ' ]')  : ''}}
          onChange={(e, value) => {
            setValue('year', null);
            setValue("trim", null);
            setValue("engine", null);
            setValue("generation", value);
           
          } }
        />
        <RHFDatePicker
          name="year"
          views={['year']}
          label="Year"
          openTo="year"
          className='add-car-datepicker'
          shouldDisableYear={year => fYear(year) < generations.find(carGeneration => carGeneration.name === values?.generation).yearFrom 
            || fYear(year) > generations.find(carGeneration => carGeneration.name === values?.generation).yearTo 
            || fYear(year) > new Date().getFullYear()}
          disabled={!values?.generation }
        />
        
        <RHFSelect
          disabled={!values?.generation }
          name="body_type"
          label="Body Type"
        >
          {BODY_TYPES_OPTIONS.map(bodyType => <MenuItem key={bodyType.value} value={bodyType.value}>{bodyType.label}</MenuItem>)}
        </RHFSelect>
        <RHFAutocomplete
          disabled={!values?.generation }
          name="trim"
          label="Trim"
          isOptionEqualToValue={(option, value) => option.trim === value.trim}
          options={trims.map(carTrim => carTrim?.trim + ' ' + carTrim.series )}
          getOptionLabel={(option) => option ?? ''}
          onChange={(e, value) => {
            resetField("engine");
            setValue("trim", value);
            setValue("engine", engines);
          } }
        />
        <RHFSelect
          disabled={!values?.trim }
          name="engine"
          label="Engine"
          defaultValue={engines}
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
        <RHFAutocomplete
          name="registered_emirates"
          label="Registered Emirates"
          options={UAEEmirates}
          isOptionEqualToValue={isOptionEqualToValue}
          getOptionLabel={(option) => option ?? ''}
        />
        
        <RHFSelect
          disabled={!values?.model && !values?.make}
          name="keys"
          label="No. of keys"
        >
          {['1', '2', '2+'].map(key => <MenuItem key={key} value={key}>{key}</MenuItem>)}
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

          name="exterior_color"
          label="Exterior Color"
          options={exteriorColors}
        />

        <RHFAutocomplete
          name="interior_color"
          label="Interior Color"
          options={interiorColors}
        />

        <RHFAutocomplete
          name="first_owner"
          label="First Owner"
          options={firstOwnerOptions}
        />
        
      </Box>
      <Typography variant="h4">Car History</Typography>
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
        { renderAddCarSelect({ name: 'warranty', label: 'Warranty', options: WARRANTY_OPTIONS })}
        { renderAddCarSelect({ name: 'accident_history', label: 'Accident History', options: ACCIDENT_HISTORY_OPTIONS })}
        { renderAddCarSelect({ name: 'bank_finance', label: 'Mortgage/Bank Finance', options: BANK_FINANCE_OPTIONS })}
        {/* <RHFCheckbox name="bank_finance" label="Mortgage/Bank Finance" /> */}
        <RHFTextField name="car_history_comment" label="Additional Information" multiline />
      </Box>
  </Stack>);
}
