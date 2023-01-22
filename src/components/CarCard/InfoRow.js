import { useMemo } from "react";
import {
  Box,
  Typography
} from "@mui/material";

import SpecItem from './SpecItem';

export default function InfoRow({ data }) {
  const image = useMemo(() => {
    return data.images && data?.images[0] ? `https://api.carsxchange.com/${data.images[0]}` : ''
  }, [data])

  return (
    <Box
      sx={{
        mt: '10px',
        display: 'flex',
        flexDirection: { xs: 'column', sm: 'row' }
      }}
    >
      <Box sx={{
        marginRight: '20px',
        maxWidth: { xs: '100%', sm: '265px' }
      }}>
        <img
          src={image}
          alt="car"
          style={{
            width: '100%',
            borderRadius: '8px'
          }}
        />
      </Box>
      <Box sx={{
        width: '100%'
      }}>
        <Box sx={{
          display: 'flex',
          fontSize: '18px',
          marginTop: { xs: '20px', sm: 0 }
        }}>
          <Typography
            color="#8184A3"
            mr={0.5}
          >
            Highest Bid:
          </Typography>
          <Typography
            color="#1D7DBD"
            fontWeight="bold"
          >AED {data.highestBid}</Typography>
        </Box>

        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '10px',
            width: '100%',
            marginTop: '24px',
            paddingBottom: { xs: '51px', sm: 0 }
          }}
        >
          <SpecItem>
            {data.details.mileage} km
          </SpecItem>
          <SpecItem>
            {data.details.engine.transmission}
          </SpecItem>
          <SpecItem>
            {data.details.exterior_color}
          </SpecItem>
          <SpecItem>
            {data.details.year} year
          </SpecItem>
          <SpecItem>
            {data.details.ggc}
          </SpecItem>
          <SpecItem>
            {data.details.engine.horsepower_hp} HP
          </SpecItem>
        </Box>
      </Box>
    </Box>
  )
}