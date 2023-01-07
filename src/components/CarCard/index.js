import {
  Box,
  Card,
  Typography
} from '@mui/material'

import Timer from './Timer';
import InfoRow from './InfoRow'
import Status from './Status';

export default function CarCard({
  data,
  sx
}) {
  return (
    <Card sx={{
      ...sx,
      maxWidth: 797,
      minHeight: 254,
      p: '20px',
      position: 'relative',
      paddingBottom: '50px'
    }}>
      <Box sx={{
        display: 'flex',
        alignItems: { xs: 'flex-start', sm: 'center' },
        justifyContent: 'space-between',
        flexDirection: { xs: 'column', sm: 'row' }
      }}>
        <Typography variant="h4">
          {data.name}
        </Typography>
        <Timer time={data.auctionEndTime} />
      </Box>
      <InfoRow data={data} />
      <Status status={data.status} />
    </Card>
  )
}