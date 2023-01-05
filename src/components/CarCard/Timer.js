import {
  Box,
  Typography
} from '@mui/material'
import Countdown from 'react-countdown';

export default function CarCardTimer({ time }) {
  return (
    <Box
      sx={{
        fontWeight: 500,
        minWidth: '187px'
      }}
    >
      <Typography
        variant="string"
        mr={0.5}
        color="#8184A3"
      >
        Auction ends in
      </Typography>
      <Countdown
        date={time}
        renderer={({ formatted }) => (
          <Typography
            variant="string"
            color="#E32519"
            sx={{
            }}
          >
            {`${formatted.hours}:${formatted.minutes}:${formatted.seconds}`}
          </Typography>
        )}
      />
    </Box>
  )
}