import {
  useState,
  useCallback,
} from 'react';
import {
  Box,
  FormLabel,
  Select,
  MenuItem,
} from '@mui/material'

export default function FilterFromToSelect({
  label,
  value,
  options,
  onChange
}) {
  const [range, setRange] = useState({ ...value })

  const onSelect = useCallback((key, value) => {
    let newValue = {};
    setRange((oldRange) => {
      newValue = ({
        ...oldRange,
        [key]: value
      });
      return newValue;
    });

    onChange(newValue);
  }, [setRange, onChange])

  return (
    <Box
      sx={{
        padding: '15px 32px',
        borderBottom: '1px solid #DFDFDF'
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
      <Box
        sx={{
          display: 'flex',
          gap: '15px'
        }}
      >
        <Select
          value={range.from}
          onChange={(event) => onSelect('from', event.target.value)}
          displayEmpty
          inputProps={{ 'aria-label': 'Without label' }}
          sx={{
            background: '#F8FBFD',
            width: '49%',
            maxWidth: {
              xs: '100%',
              md: '139px'
            }
          }}
        >
          {options.from.map((option, optionIndex) => (
            <MenuItem
              key={`${option}-${optionIndex}`}
              value={option}
            >{option}</MenuItem>
          ))}
        </Select>
        <Select
          value={range.to}
          onChange={(event) => onSelect('to', event.target.value)}
          displayEmpty
          inputProps={{ 'aria-label': 'Without label' }}
          sx={{
            width: '49%',
            maxWidth: {
              xs: '100%',
              md: '139px'
            }
          }}
        >
          {options.to.map((option, optionIndex) => (
            <MenuItem
              key={`${option}-${optionIndex}`}
              value={option}
            >{option}</MenuItem>
          ))}
        </Select>
      </Box>
    </Box>
  )
}