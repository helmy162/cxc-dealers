import { Box } from '@mui/material';

import ResultsCount from './ResultsCount';
import CarSpecs from './CarSpecs';

export default function CarsListingFilters({ sx }) {

  return (
    <Box
      sx={{
        ...sx,
        maxWidth: {
          xs: '100%',
          md: '358px'
        },
        background: 'white',
        border: 'solid #DFDFDF 1px',
        borderRadius: '8px',
        marginRight: {
          xs: 0,
          md: '31px'
        },
        overflow: 'hidden'
      }}
    >
      <ResultsCount />
      <CarSpecs />
    </Box>
  )
}