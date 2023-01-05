import { Box } from '@mui/material';

import CarCard from '../../../components/CarCard';

export default function CarsList({ cars }) {
  return (
    <Box>
      {cars.map((car) => (
        <CarCard
          key={car.id}
          data={car}
          sx={{
            marginBottom: '20px'
          }}
        />
      ))}
    </Box>
  )
}