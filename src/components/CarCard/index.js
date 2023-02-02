import {
  Box,
  Card,
  Typography
} from '@mui/material'

import { Link as RouterLink  } from 'react-router-dom';

import Timer from './Timer';
import InfoRow from './InfoRow'
import Status from './Status';
import { PATH_DEALER } from 'src/routes/paths';

export default function CarCard({
  data,
  sx
}) {

  return (
    <Card sx={{
      ...sx,
      maxWidth: 797,
      minHeight: 254,
      p: '0px',
      position: 'relative',

    }}
    >
      <RouterLink className='sm:flex-row flex-col-reverse' style={{display:'flex', flexDirection: { xs: 'column', sm: 'row' }}} to={PATH_DEALER.car(data.id)}>
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
              <Timer data={data} />
            }
          </Box>
          <InfoRow data={data} />
        </Box>
        <Status status={data.status} data={data} />
        
      </RouterLink>
    </Card>
  )
}