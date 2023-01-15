import { Box, Typography } from '@mui/material';

export default function EngineCard ({ option, obj }) {
  return <Box
    rowGap={0}
    columnGap={0}
    display="grid"
    gridTemplateColumns={{
      xs: 'repeat(1, 1fr)',
      sm: 'repeat(2, 1fr)',
    }}
    {...option}
  >
    <Typography variant="caption" display="block">EngineCC</Typography>
    <Typography variant="subtitle2">{obj.size}</Typography>
    <Typography variant="caption" display="block" >Cylinders</Typography>
    <Typography variant="subtitle2" >{obj.cylinders}</Typography>
    <Typography variant="caption" display="block" >Engine Type</Typography>
    <Typography variant="subtitle2" >{obj.engine_type}</Typography>
    <Typography variant="caption" display="block" >Horsepower (in BHP)</Typography>
    <Typography variant="subtitle2" >{obj.horsepower_hp}</Typography>
    <Typography variant="caption" display="block" >Transmission type</Typography>
    <Typography variant="subtitle2" >{obj.transmission}</Typography>
    <Typography variant="caption" display="block" >Fuel Type</Typography>
    <Typography variant="subtitle2" >{obj.fuel_type}</Typography>
  </Box>
}
