import { useMemo } from 'react';
import { Box } from '@mui/material';

const statusColors = {
  expired: '#E32519',
  live: '#1FD63C',
  pending: '#ffc400'
}

export default function CarCardStatus({ status }) {
  const backgroundColor = useMemo(() => statusColors[status.toLocaleLowerCase()], [status])
  return (
    <Box
      sx={{
        color: 'white',
        borderRadius: '8px 0px',
        backgroundColor: backgroundColor,
        minWidth: '85px',
        minHeight: '31px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        bottom: 0,
        right: 0,
        padding: '5px'
      }}
    >
      <Box
        sx={{
          width: '7px',
          height: '7px',
          borderRadius: '50px',
          background: 'white',
          mr: '6px'
        }}
      ></Box>
      {status}
    </Box>
  )
}