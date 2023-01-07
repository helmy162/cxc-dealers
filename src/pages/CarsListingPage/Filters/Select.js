import {
  FormControl,
  FormLabel,
  Select,
  MenuItem,
} from '@mui/material'

export default function FilterSelect({
  label,
  value,
  options,
  onChange
}) {
  return (
    <FormControl
      fullWidth
      sx={{
        padding: '15px 32px',
        borderBottom: '1px solid #DFDFDF',
      }}
    >
      <FormLabel
        sx={{
          color: 'black',
          fontWeight: 600,
          fontSize: '18px',
          marginBottom: '5px',
          marginLeft: '5px'
        }}
      >
        {label}
      </FormLabel>
      <Select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        displayEmpty
        inputProps={{ 'aria-label': 'Without label' }}
        sx={{
          background: '#F8FBFD'
        }}
      >
        {options.map((option, optionIndex) => (
          <MenuItem
            key={`${option}-${optionIndex}`}
            value={option}
          >{option}</MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}