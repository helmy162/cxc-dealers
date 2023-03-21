import { MenuItem } from "@mui/material";
import { RHFSelect, RHFSwitch } from "src/components/hook-form";

const isOptionEqualToValue = (option, value) => option.name === value.name

const hasSameName = (option, value) => {
  console.log(option.name, value);
  return option.name == value
};
const renderSelectOptions = (options => options.map(option => <MenuItem value={option.value} key={option.value}>{option.label}</MenuItem>));

const renderAddCarSelect = ({ name, label, options }) => <RHFSelect key={name} name={name} label={label}>
  {renderSelectOptions(options)}
</RHFSelect>
const renderAddCarSwitch = ({ name, label }) => <RHFSwitch key={name} name={name} label={label} />

export { isOptionEqualToValue, hasSameName, renderSelectOptions, renderAddCarSelect,renderAddCarSwitch };
