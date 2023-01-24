import { useState } from 'react';
import {
  Box,
  Typography,
  Select,
  MenuItem
} from '@mui/material';

import { useRecoilState } from 'recoil';

import FilterItem from './FilterItem'

import filterAtom from '../FilterAtom';

import './style.css'


export default function AppliedFilters() {
  const [filters] = useRecoilState(filterAtom);
  const [sortBy, setSortBy] = useState('Sort by');

  console.log('sortBy', sortBy)
  console.log("🚀 ~ file: AppliedFilters.js:13 ~ AppliedFilters ~ filters", filters)

  return (
    <Box
      className="filters"
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
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
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '14px',
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

      <Select
        value={sortBy}
        onChange={(event) => setSortBy(event.target.value)}
        label="Sort by"
        sx={{
          border: 'solid #127BBF 1.5px',
          height: '40px'
        }}
      >
        <MenuItem value="Sort by" disabled>Sort by</MenuItem>
        {Object.entries(filters).map(([key, value]) => (
          <MenuItem key={`${key}-${value}`} value={value}>{`${key} ${value}`}</MenuItem>
        ))}
      </Select>
    </Box>
  )
}