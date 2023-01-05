import {
  Box,
  Typography
} from '@mui/material'

export default function CarCardTimer({
  theme,
  time,
}) {
  return (
    <Box
      sx={{
        fontWeight: 500
      }}
    >
      <Typography
        variant="string"
        mr={0.5}
        color="#8184A3"
      >
        Auction ends in
      </Typography>
      <Typography
        variant="string"
        color="#E32519"
      >
        00:00:31
      </Typography>
    </Box>
  )
}