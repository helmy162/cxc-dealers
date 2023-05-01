import * as Yup from 'yup';
// @mui
import { Stack, Alert, Box, MenuItem, Typography, InputAdornment} from '@mui/material';

import { RHFAutocomplete, RHFCheckbox, RHFDatePicker, RHFSelect, RHFSwitch, RHFTextField } from '../../../components/hook-form';
import useAddCarAutocompletes from 'src/hooks/useAddCarAutocompletes';
import { hasSameName, isOptionEqualToValue, renderAddCarSelect } from 'src/utils/forms';
import { fYear } from 'src/utils/formatTime';
import EngineCard from './EngineCard';
import { BODY_TYPES_OPTIONS, SERVICE_HISTORY_OPTIONS, MANUALS_OPTIONS, ACCIDENT_HISTORY_OPTIONS, WARRANTY_OPTIONS, BANK_FINANCE_OPTIONS, BANK_FINANCE_STATUS_OPTIONS } from '../constants';

import { getSellers, resetSeller } from '../../../redux/slices/user';
import { useDispatch, useSelector } from '../../../redux/store';


// ----------------------------------------------------------------------

const INTERIOR_TYPES = ["Full Leather",	"Fabric",	"Double Ton leather/fabric mix"];
const exteriorColors = ["White", "Black", "Silver", "Gray", "Red", "Blue", "Green", "Yellow", "Brown", "Orange", "Other"];
const interiorColors = ["Black", "Gray", "Beige", "Brown", "White", "Other"];
const firstOwnerOptions = ["Yes", "No", "Unknown"];
const UAEEmirates = ["Abu Dhabi", "Ajman", "Al Ain", "Dubai", "Fujairah", "Ras Al Khaimah", "Sharjah", "Umm Al Quwain"];
const FUEL_TYPES = ["Petrol", "Diesel", "Electric", "Hybrid"];
const TRANSMISSION_TYPES = ["Automatic", "Manual"];
const WHEEL_TYPES = ["2WD", "4WD", "AWD"];
const SAFETY_BELT_OPTIONS = ["Good", "Damaged", "Maybe Required replacement", "Maybe Required repair"]
const CAR_OPTIONS = ['Basic Option', 'Mid Option', 'Full Option'];
const SPECIFICATIONS = ["GCC", "American", "Japanese" , "European", "Other"];

const mapFormDataToApi = (values) => ( values ? {
  make: values.make || '',
  trim: values.trim || null,
  model: values.model || '',
}: {})


export default function SummaryStep({ errors, watch, setValue, resetField }) {
  const values = watch();
  const { sellers } = useSelector((state) => state.user);
  const { makes, models, trims } = useAddCarAutocompletes(mapFormDataToApi(values))
    
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
        <RHFAutocomplete
          name="seller_id"
          label="Seller ID"
          options={sellers.map(seller => seller.id)}
          isOptionEqualToValue={ (option, value) => option == value}
          getOptionLabel={(option) => {
            const thisSeller = sellers.find(seller => seller.id == option)
            return thisSeller? (thisSeller?.name + '  - #' + thisSeller?.id) : ''}}
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
          options={makes}
          isOptionEqualToValue={isOptionEqualToValue}
          getOptionLabel={(option) => option ?? ''}
          onChange={(e, value) => {
            resetField("model");
            resetField("year");
            resetField("trim");
            setValue("make", value);
          } }
        />
         <RHFAutocomplete
          disabled={!values?.make}
          name="model"
          label="Model"
          options={models}
          isOptionEqualToValue={isOptionEqualToValue}
          getOptionLabel={(option) => option ?? ''}
          onChange={(e, value) => {
            resetField("year");
            resetField("trim");
            setValue("model", value);
          } }
        />
        <RHFAutocomplete
          disabled={!values?.model }
          name="trim"
          label="Trim"
          isOptionEqualToValue={isOptionEqualToValue}
          options={trims}
          getOptionLabel={(option) => option ?? ''}
        />
        
        <RHFDatePicker
          name="year"
          views={['year']}
          label="Year"
          openTo="year"
          className='add-car-datepicker'
          shouldDisableYear={year => fYear(year) < 2000 ||  fYear(year) > new Date().getFullYear()}
        />

        <RHFTextField
          name="engine_size"
          label="Engine Size ( CC )"
          type="number"
        />

        <RHFTextField
          name="number_of_cylinders"
          label="Number of Cylinders"
          type="number"
        />
        
        <RHFSelect
          name="body_type"
          label="Body Type"
        >
          {BODY_TYPES_OPTIONS.map(bodyType => <MenuItem key={bodyType.value} value={bodyType.value}>{bodyType.label}</MenuItem>)}
        </RHFSelect>
        
        <RHFTextField
          name="mileage"
          label="Mileage ( KM )"
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
          name="fuel_type"
          label="Fuel Type"
        >
          {FUEL_TYPES.map(fuelType => <MenuItem key={fuelType} value={fuelType}>{fuelType}</MenuItem>)}
        </RHFSelect>

        <RHFSelect
          name="transmission"
          label="Transmission "
        >
          {TRANSMISSION_TYPES.map(transmissionType => <MenuItem key={transmissionType} value={transmissionType}>{transmissionType}</MenuItem>)}
        </RHFSelect>

        <RHFSelect
          name="wheel_type"
          label="Wheel Type"
        >
          {WHEEL_TYPES.map(wheelType => <MenuItem key={wheelType} value={wheelType}>{wheelType}</MenuItem>)}
        </RHFSelect>

        <RHFSelect
          name="car_options"
          label="Car Options"
        >
          {CAR_OPTIONS.map(carOption => <MenuItem key={carOption} value={carOption}>{carOption}</MenuItem>)}
        </RHFSelect>

        <RHFSelect
        name="safety_belt"
        label="Safety Belt"
        >
          {SAFETY_BELT_OPTIONS.map(safetyBelt => <MenuItem key={safetyBelt} value={safetyBelt}>{safetyBelt}</MenuItem>)}
        </RHFSelect>
        
        
        <RHFSelect
          name="keys"
          label="No. of keys"
        >
          {['1', '2', '2+'].map(key => <MenuItem key={key} value={key}>{key}</MenuItem>)}
        </RHFSelect>
        <RHFSelect
          name="specification"
          label="Specification"
        >
          {SPECIFICATIONS.map(key => <MenuItem key={key} value={key}>{key}</MenuItem>)}
        </RHFSelect>
        <RHFSelect
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
        { renderAddCarSelect({ name: 'bank_finance_status', label: 'Mortgage/Bank Status', options: BANK_FINANCE_STATUS_OPTIONS })}
        {/* <RHFCheckbox name="bank_finance" label="Mortgage/Bank Finance" /> */}
        <RHFTextField name="car_history_comment" label="Additional Information" multiline />
      </Box>
  </Stack>);
}
