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
    }}>
      <Box sx={{
        display: 'flex',
        alignItems: { xs: 'flex-start', md: 'center' },
        justifyContent: 'space-between',
        flexDirection: { xs: 'column', md: 'row' }
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