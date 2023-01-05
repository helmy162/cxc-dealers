import { Box } from '@mui/material';

import ResultsCount from './ResultsCount';

export default function CarsListingFilters() {
  return (
    <Box
      sx={{
        minWidth: '358px',
        background: 'white',
        border: 'solid #DFDFDF 1px',
        borderRadius: '8px',
        marginRight: '31px',
      }}
    >
      <ResultsCount />
    </Box>
  )
}