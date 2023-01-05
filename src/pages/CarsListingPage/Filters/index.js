import { Box } from '@mui/material';

import ResultsCount from './ResultsCount';
import CarSpecs from './CarSpecs';

export default function CarsListingFilters() {

  return (
    <Box
      sx={{
        minWidth: '358px',
        background: 'white',
        border: 'solid #DFDFDF 1px',
        borderRadius: '8px',
        marginRight: '31px',
        overflow: 'hidden'
      }}
    >
      <ResultsCount />
      <CarSpecs />
    </Box>
  )
}