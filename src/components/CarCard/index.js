import {
  Box,
  Card,
  Typography
} from '@mui/material'
import { useEffect, useState} from 'react';
import { Link as RouterLink  } from 'react-router-dom';

import Timer from './Timer';
import InfoRow from './InfoRow'
import Status from './Status';
import { PATH_DEALER } from 'src/routes/paths';
import { carStatus, carTimer } from '../../utils/status';

export default function CarCard({
  expired,
  data,
  sx
}) {
  const [livestatus, setLiveStatus] = useState('');
  useEffect(() => {
    setLiveStatus(data.status == 'pending'? 'pending' : carStatus(data))
  }, [data]);

  return (
    <Card sx={{
      ...sx,
      // maxWidth: 797,
      minHeight: 254,
      p: '0px',
      position: 'relative',

    }}
    >
      <RouterLink className='sm:flex-row flex-col-reverse' style={{display:'flex', flexDirection: { xs: 'column', sm: 'row' }}} 
      to={ 
        new Date(data?.auction?.start_at) <= new Date()
        && 
        new Date(data?.auction?.end_at) >= new Date()
        ?
          PATH_DEALER.car(data.id)
        :
          new Date(data?.auction?.end_at) < new Date() 
          ?
            PATH_DEALER.offer(data.id)
          :
          null
      }
      >
        <Box sx={{
          width: '100%',
          display: 'flex',
          padding: '20px',
          alignItems: { xs: 'flex-start', sm: 'center' },
          justifyContent: 'space-between',
          flexDirection: { xs: 'column', sm: 'column' }
        }}>
          <Box sx={{display: 'flex', alignItems:'center', justifyContent:'space-between', width:'100%', flexDirection: { xs: 'column', sm: 'row' }}}>
            <Typography variant="h4">
              {data.details.make + ' ' + data.details.model + ' ' + data.details.year}
            </Typography>
            {
              data.status === 'approved' && 
              <Timer product={data} />
            }
          </Box>
          <InfoRow data={data} expired={expired}/>
        </Box>
        <Status product={data} />
        
      </RouterLink>
    </Card>
  )
}