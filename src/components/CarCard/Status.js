import { useMemo, useEffect, useState} from 'react';
import { Box } from '@mui/material';

const statusColors = {
  expired: '#E32519',
  live: '#1FD63C',
  pending: '#ffc400'
}

export default function CarCardStatus({ data, status }) {

  const [livestatus, setLiveStatus] = useState('pending');

  useEffect(() => {
    if(status?.toLocaleLowerCase() !== 'approved') return
    setLiveStatus('live')
    const endDate = new Date(data?.auction?.end_at);
    const intervalId = setInterval(() => {
      const currentTime = new Date();
      const difference = endDate - currentTime;
      if (difference < 0) {
        clearInterval(intervalId);
        setLiveStatus('expired')
        return;
      }
      
    }, 1000);

    return () => clearInterval(intervalId);
  }, [data]);

  status = status?.toLocaleLowerCase()
  const backgroundColor = useMemo(() => statusColors[livestatus.toLocaleLowerCase()], [livestatus])
  return (
    <Box
      sx={{
        color: 'white',
        borderRadius: '0px',
        backgroundColor: backgroundColor,
        minWidth: { xs: '100%', sm: '85px' },
        maxWidth: '85px',
        marginLeft: 'auto',
        minHeight: { xs: '50px', sm: '254px' },
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        bottom: 0,
        right: 0,
        padding: '5px',
        textTransform: 'capitalize',
      }}
    >
      <Box
        sx={{
          width: '7px',
          height: '7px',
          borderRadius: '50px',
          background: 'white',
          mr: '6px',
        }}
      ></Box>
      {livestatus}
    </Box>
  )
}