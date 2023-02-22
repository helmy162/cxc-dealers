import {
  Box,
  Typography
} from '@mui/material'
import Countdown from 'react-countdown';
import { useEffect, useState } from 'react';
import { carStatus, carTimer } from '../../utils/status';

export default function CarCardTimer({ product }) {
  const [timeRemaining, setTimeRemaining] = useState(null);

  useEffect(() => {
    const endAt = new Date(product?.auction?.end_at);
    const startAt = new Date(product?.auction?.start_at);
    const now = new Date();
    setTimeRemaining(product.status == 'pending'? null : startAt > now ? 'Starts In ' + carTimer( startAt - now) : endAt < now ? null : 'Ends After ' + carTimer(endAt - now))
    const intervalId = setInterval(() => {
      const now = new Date();
      setTimeRemaining(product.status == 'pending'? null : startAt > now ? 'Starts In ' + carTimer( startAt - now) : endAt < now ? null : 'Ends After ' + carTimer(endAt - now))
    }, 1000);
  return () => clearInterval(intervalId);
  }, [product]);
  

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
        {timeRemaining} 
      </Typography>
      
    </Box>
  )
}