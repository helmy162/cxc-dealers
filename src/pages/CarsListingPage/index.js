import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import {
  Box,
  Container,
  Button,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';

import Filters from './Filters';
import CarsList from './CarsList';
import OffersCount from './OffersCount';
import AppliedFilters from './AppliedFilters';
import Header from '../../layouts/dashboard/header';

import useCarsListingPage from './useCarsListingPage';

import CarImg from '../../assets/illustrations/car.jpg'

// const cars = [
//   {
//     id: 1,
//     name: 'Audi R8 2018',
//     imageUrl: CarImg,
//     highestBid: '230,224',
//     status: 'live',
//     specs: ['59,900 km', 'Automatic', 'V10', 'Parchery repainted', 'GCC', 'White'],
//     auctionEndTime: Date.now() + 50000
//   },
//   {
//     id: 2,
//     name: 'Audi R8 2018',
//     imageUrl: CarImg,
//     highestBid: '230,224',
//     status: 'expired',
//     specs: ['59,900 km', 'Automatic', 'V10', 'Parchery repainted', 'GCC', 'White'],
//     auctionEndTime: Date.now() + 10000
//   },
//   {
//     id: 3,
//     name: 'Audi R8 2018',
//     imageUrl: CarImg,
//     highestBid: '230,224',
//     status: 'live',
//     specs: ['59,900 km', 'Automatic', 'V10', 'Parchery repainted', 'GCC', 'White'],
//     auctionEndTime: Date.now() + 10000
//   },
// ]

export default function CarsListingPage() {
  const [isFilterVisible, setFilterVisible] = useState(false);

  const {
    isLoading,
    cars,
    isLoadMoreButtonVisible,
    loadMore
  } = useCarsListingPage();

  const toggleFilter = () => {
    setFilterVisible((oldValue) => !oldValue);
  }

  return (
    <Box
      sx={{
        backgroundColor: '#F8FBFD',
      }}
    >
      <Helmet>
        <title>Cars</title>
      </Helmet>

      <Header />

      <Container
        sx={{
          display: 'flex',
          flexDirection: {
            xs: 'column',
            md: 'row'
          },
          padding: '10px',
          paddingTop: '110px'
        }}
      >
        <Filters
          sx={{
            display: {
              xs: 'none',
              md: 'block'
            }
          }}
        />
        <Box sx={{
          width: '100%',
        }}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'flex-start',
              justifyContent: 'space-between',
            }}
          >
            <OffersCount count="237" />
            <Button
              variant="contained"
              sx={{
                display: {
                  xs: 'block',
                  md: 'none'
                }
              }}
              onClick={toggleFilter}
            >
              Filter
            </Button>
          </Box>
          {isFilterVisible && <Filters sx={{ marginBottom: '20px' }} />}
          <AppliedFilters />
          <CarsList cars={cars} />
          <Box sx={{ display: 'flex' }}>
            {isLoadMoreButtonVisible && (
              <LoadingButton
                sx={{
                  margin: 'auto'
                }}
                loading={isLoading}
                variant="contained"
                onClick={loadMore}
              >
                Load More
              </LoadingButton>
            )}
          </Box>
        </Box>
      </Container>
    </Box>
  )
}