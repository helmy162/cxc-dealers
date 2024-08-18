import { useState, useEffect} from 'react';
import { Helmet } from 'react-helmet-async';
import {
  Box,
  Container,
  Button,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';

import Filters from './Filters';
import CarsList from './CarsList';
import CarsCount from './CarsCount';
import AppliedFilters from './AppliedFilters';
import useCarsListingPage from './useCarsListingPage';
import LoadingScreen from '../../../components/loading-screen';

import { resetProduct } from '../../../redux/slices/product';
import { useDispatch } from '../../../redux/store';

export default function CarsListingPage({ expired = false}) {
  const [isFilterVisible, setFilterVisible] = useState(false);
  
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(resetProduct());
}, [dispatch]);

  const {
    isLoading,
    cars,
    cars2,
    total,
    total2,
    isLoadMoreButtonVisible,
    isLoadMoreButtonVisible2,
    loadMore
  } = useCarsListingPage(expired);

  const toggleFilter = () => {
    setFilterVisible((oldValue) => !oldValue);
  }

  return (
    <Box
      sx={{
        // backgroundColor: '#F8FBFD',
      }}
    >
      <Helmet>
        <title>Cars</title>
      </Helmet>
      {isLoading && <LoadingScreen />}
      <Container
        sx={{
          display: 'flex',
          flexDirection: {
            xs: 'column',
            md: 'row'
          },
          padding: '10px',
          paddingTop: { xs: '8px', sm: '36px' },
        }}
      >
        {/* <Filters
          sx={{
            display: {
              xs: 'none',
              md: 'block'
            }
          }}
        /> */}
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
            <CarsCount count={expired ? total2 : total} />
            {/* <Button
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
            </Button> */}
          </Box>
          {/* {isFilterVisible && <Filters sx={{ marginBottom: '20px' }} />} */}
          {/* <AppliedFilters /> */}
          <CarsList cars={expired? cars2 : cars} expired={expired} ishotdeal={true} />
          <Box sx={{ display: 'flex' }}>
            {(( expired && isLoadMoreButtonVisible2 ) || (!expired && isLoadMoreButtonVisible)) && (
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