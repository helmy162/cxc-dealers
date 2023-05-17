import { Box } from '@mui/material';

import CarCard from '../../../../components/CarCard';

export default function CarsList({ cars, expired }) {
  return (
    <Box>
      
      {
      cars.length > 0 ?
      cars.map((car) => (
        <CarCard
          expired={expired}
          key={car.id}
          data={car}
          sx={{
            marginBottom: { xs: '8px', sm: '20px'}
          }}
        />
      ))
    :
    <div>
      <h1 className='text-center'>There are no cars available at the moment, please try again later</h1>
    </div>
    }
    </Box>
  )
}