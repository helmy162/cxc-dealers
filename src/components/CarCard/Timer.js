import {
  Box,
  Typography
} from '@mui/material'
import Countdown from 'react-countdown';
import { useEffect, useState } from 'react';

export default function CarCardTimer({ data }) {
  const [timeRemaining, setTimeRemaining] = useState(null);
  const [startIn, setStartIn] = useState(null);

  useEffect(() => {
    const endDate = new Date(data?.auction?.end_at);
    const startDate = new Date(data?.auction?.start_at);
    const intervalId = setInterval(() => {
      const currentTime = new Date();
      const difference = endDate - currentTime;
      setStartIn(startDate - currentTime);

      if (difference < 0) {
        clearInterval(intervalId);
        setTimeRemaining(null);
        return;
      }

      const hours = Math.floor(difference / 1000 / 60 / 60);
      const minutes = Math.floor((difference / 1000 / 60) % 60);
      const seconds = Math.floor((difference / 1000) % 60);

      setTimeRemaining(
        `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
      );      
    }, 1000);

    return () => clearInterval(intervalId);
  }, [data]);

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
        
        {startIn? 'Stay Tuned' : timeRemaining ? 'Auction ends in ' + timeRemaining : 'Expired'} 
      </Typography>
      
    </Box>
  )
}