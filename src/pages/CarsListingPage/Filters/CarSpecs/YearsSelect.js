import {
  useMemo,
  useState,
  useCallback
} from 'react';
import {
  FormControl,
  FormLabel,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Typography
} from '@mui/material';


export default function YearsSelect() {
  const [range, setRange] = useState(7);
  const [selectedDates, setSelectedDate] = useState([]);
  const years = useMemo(() => {
    const range = (min, max) => Array.from({ length: max - min + 1 }, (_, i) => min + i);

    return range(1980, 2023).reverse();
  }, []);

  const yearsRange = useMemo(() => years.slice(0, range), [years, range])
  const yearsLeft = useMemo(() => years.length - yearsRange.length, [years, yearsRange]);

  const showAll = useCallback(() => {
    setRange(years.length)
  }, [setRange, years])

  const onYearSelect = useCallback((year) => {
    setSelectedDate((oldValue) => {
      const newValue = [...oldValue];

      newValue.push(year);

      return newValue;
    })
  }, [setSelectedDate])

  return (
    <FormControl
      sx={{
        width: '100%',
        padding: '15px 32px',
        borderBottom: '1px solid #DFDFDF',
        textAlign: 'center'
      }}
    >
      <FormLabel
        sx={{
          color: 'black',
          fontWeight: 600,
          fontSize: '18px',
          marginBottom: '5px',
          marginLeft: '5px',
          textAlign: 'left'
        }}
      >
        Year
      </FormLabel>
      <FormGroup>
        {yearsRange.map((year) => (
          <FormControlLabel
            key={year}
            label={year}
            control={<Checkbox onChange={() => onYearSelect(year)} />}
          />
        ))}
      </FormGroup>
      {yearsLeft > 0 && (
        <Typography
          variant="h5"
          sx={{
            color: '#1D7DBD',
            fontSize: '20px',
            fontWeight: '600',
            cursor: 'pointer',
            marginTop: '20px'
          }}
          onClick={showAll}
        >
          See {yearsLeft} more
        </Typography>
      )}
    </FormControl>
  )
}