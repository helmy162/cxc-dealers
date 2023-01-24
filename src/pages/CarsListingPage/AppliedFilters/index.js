import {
  Box,
  Typography
} from '@mui/material';

import { useRecoilState } from 'recoil';

import FilterItem from './FilterItem'

import filterAtom from '../FilterAtom';


export default function AppliedFilters() {
  const [filters] = useRecoilState(filterAtom);
  console.log("🚀 ~ file: AppliedFilters.js:13 ~ AppliedFilters ~ filters", filters)

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '14px',
        marginBottom: '20px',
        background: 'white',
        padding: '23px 30px',
        borderRadius: '8px',
        border: '1px solid #DFDFDF',
        maxWidth: '797px',
        width: {
          xs: '100%',
          xl: '797px'
        }
      }}
    >
      <Typography
        variant="span"
        sx={{
          color: '#8184A3',
          fontSize: '16px',
          fontWeight: 500
        }}
      >
        Filtering by: {' '}
      </Typography>
      {filters.make && (
        <FilterItem>
          {`Make: ${filters.make}`}
        </FilterItem>
      )}
      {filters.model && (
        <FilterItem>
          {`Model: ${filters.model}`}
        </FilterItem>
      )}
      {filters.variant && (
        <FilterItem>
          {`Variant: ${filters.variant}`}
        </FilterItem>
      )}
      {filters?.years?.map((year) => (
        <FilterItem key={`filter-item-year-${year}`}>
          {`Year: ${year}`}
        </FilterItem>
      ))}
      {filters.mileage && (
        <>
          <FilterItem>
            {`Mileage from: ${filters.mileage.from}`}
          </FilterItem>
          <FilterItem>
            {`Mileage to: ${filters.mileage.to}`}
          </FilterItem>
        </>
      )}
      {filters.bodyType && (
        <FilterItem>
          {`Body Type: ${filters.bodyType}`}
        </FilterItem>
      )}
      {filters.color && (
        <FilterItem>
          {`Color: ${filters.color}`}
        </FilterItem>
      )}
      {filters.sellersPrice && (
        <>
          <FilterItem>
            {`Seller's Price from: ${filters.sellersPrice.from}`}
          </FilterItem>
          <FilterItem>
            {`Seller's Price to: ${filters.sellersPrice.to}`}
          </FilterItem>
        </>
      )}
    </Box>
  )
}