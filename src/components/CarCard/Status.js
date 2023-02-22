import { useMemo, useEffect, useState} from 'react';
import { Box } from '@mui/material';
import { carStatus, carTimer } from '../../utils/status';

const statusColors = {
  expired: '#E32519',
  live: '#1FD63C',
  pending: '#ffc400',
  upcoming: '#0077C9',
}

export default function CarCardStatus({ product }) {

  const [livestatus, setLiveStatus] = useState('');

  useEffect(() => {
    setLiveStatus(product.status == 'pending'? 'pending' : carStatus(product))  
  }, []);
  useEffect(() => {
    const intervalId = setInterval(() => {
      setLiveStatus(product.status == 'pending'? 'pending' : carStatus(product))  
    }, 1000);
    return () => clearInterval(intervalId);
  }, [product]);

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