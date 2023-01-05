import { Helmet } from 'react-helmet-async';
import { Container } from '@mui/material'

import CarCard from '../components/CarCard';

import CarImg from '../assets/illustrations/car.jpg'

const cars = [
  {
    id: 1,
    name: 'Audi R8 2018',
    imageUrl: CarImg,
    highestBid: '230,224',
    status: 'live',
    specs: ['59,900 km', 'Automatic', 'V10', 'Parchery repainted', 'GCC', 'White'],
    auctionEndTime: Date.now() + 50000
  },
  {
    id: 2,
    name: 'Audi R8 2018',
    imageUrl: CarImg,
    highestBid: '230,224',
    status: 'expired',
    specs: ['59,900 km', 'Automatic', 'V10', 'Parchery repainted', 'GCC', 'White'],
    auctionEndTime: Date.now() + 10000
  },
  {
    id: 3,
    name: 'Audi R8 2018',
    imageUrl: CarImg,
    highestBid: '230,224',
    status: 'live',
    specs: ['59,900 km', 'Automatic', 'V10', 'Parchery repainted', 'GCC', 'White'],
    auctionEndTime: Date.now() + 10000
  },
]

export default function CarsListingPage() {
  return (
    <>
      <Helmet>
        <title>Cars</title>
      </Helmet>

      <Container>
        {cars.map((car) => (
          <CarCard
            key={car.id}
            data={car}
            sx={{
              marginBottom: '20px'
            }}
          />
        ))}
      </Container>
    </>
  )
}