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
import CarHighestBid from './CarHighestBid';
import CarName from './CarName';
import CarImage from './CarImage';

export default function CarCard({
  expired,
  data,
  ishotdeal,
  sx
}) {
  const [livestatus, setLiveStatus] = useState('');
  useEffect(() => {
    setLiveStatus(data.status == 'pending'? 'pending' : carStatus(data))
  }, [data]);

  function getCurrentDimension(){
    return {
      	width: window.innerWidth,
      	height: window.innerHeight
    }
  }

const [screenSize, setScreenSize] = useState(getCurrentDimension());

useEffect(() => {
    function handleResize() {
        setScreenSize(getCurrentDimension());
    }
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
}, [screenSize]);


  return (
    <Card sx={{
      ...sx,
      // maxWidth: 797,
      p: '0px',
      position: 'relative',

    }}
    >
      <RouterLink className='sm:flex-row flex-row' style={{display:'flex', flexDirection: { xs: 'column', sm: 'row' }}} 
      to={ 
        new Date(data?.auction?.end_at) >= new Date()
        ?
          PATH_DEALER.car(data.id)
        :
          PATH_DEALER.soldCar(data.id)
      }
      >
        {
          screenSize.width >= 600 ?
          <>
          <Box sx={{
            width: '100%',
            display: 'flex',
            padding: '20px',
            alignItems: { xs: 'flex-start', sm: 'center' },
            justifyContent: 'space-between',
            flexDirection: { xs: 'column', sm: 'column' }
          }}>
            <Box sx={{display: 'flex', alignItems:'center', justifyContent:'space-between', width:'100%', flexDirection: { xs: 'column', sm: 'row' }}}>
              <CarName data={data} />
              <Timer product={data} />
            </Box>
            <Box
              sx={{
                mt: '10px',
                display: 'flex',
                flexDirection: { xs: 'row', sm: 'row' },
                width: '100%',
              }}
            >
              <CarImage data={data} />
              <Box sx={{
                width: '100%'
              }}>
                <CarHighestBid data={data} expired={expired}/>
                <InfoRow data={data}/>
              </Box>
            </Box>
          </Box>
          <Status product={data} ishotdeal={ishotdeal} />
         </>
         :
         <>
          <Box sx={{
            width: '100%',
            display: 'flex',
            padding: '12px',
            alignItems: { xs: 'center', sm: 'center' },
            justifyContent: 'space-between',
            flexDirection: { xs: 'row', sm: 'row' },
            gap: '16px'
          }}>
            <CarImage data={data} />
            <Box sx={{display: 'flex', alignItems:'center', justifyContent:'space-between', width:'100%', flexDirection: { xs: 'column', sm: 'row' }, gap:'4px'}}>
              <Box sx={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '16px'
              }}>
                <CarName data={data} />
                <Timer product={data} />
              </Box>

              <InfoRow data={data} mobile={true}/>
              
              <Box sx={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
                <Status product={data} mobile={true} ishotdeal={ishotdeal} />
                <CarHighestBid data={data} expired={expired} mobile={true}/>
              </Box>
            </Box>
          </Box>
         </>
        }
        
        
      </RouterLink>
    </Card>
  )
}