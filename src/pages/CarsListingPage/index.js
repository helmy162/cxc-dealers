import { Helmet } from 'react-helmet-async';
import {
  Box,
  Container
} from '@mui/material';

import Filters from './Filters';
import CarsList from './CarsList';
import OffersCount from './OffersCount';
import AppliedFilters from './AppliedFilters';


import CarImg from '../../assets/illustrations/car.jpg'

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
    <Box
      sx={{
        backgroundColor: '#F8FBFD',
      }}
    >
      <Helmet>
        <title>Cars</title>
      </Helmet>

      <Container
        sx={{
          display: 'flex',
          padding: '10px'
        }}
      >
        <Filters />
        <Box>
          <OffersCount count="237" />
          <AppliedFilters />
          <CarsList cars={cars} />
        </Box>
      </Container>
    </Box>
  )
}