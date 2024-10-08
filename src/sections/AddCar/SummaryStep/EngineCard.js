import { Box, Typography } from '@mui/material';

export default function EngineCard ({ option, obj, ...other }) {
  return <Box
    rowGap={0}
    columnGap={0}
    display="grid"
    gridTemplateColumns={{
      xs: 'repeat(1, 1fr)',
      sm: 'repeat(2, 1fr)',
    }}
    {...option}
    {...other}
  >
    <Typography variant="caption" display="block">EngineCC</Typography>
    <Typography variant="subtitle2">{obj.capacityCm3 || obj.size}</Typography>
    <Typography variant="caption" display="block" >Cylinders</Typography>
    <Typography variant="subtitle2" >{obj.numberOfCylinders || obj.cylinders}</Typography>
    <Typography variant="caption" display="block" >Engine Type</Typography>
    <Typography variant="subtitle2" >{obj.engineType || obj.type }</Typography>
    <Typography variant="caption" display="block" >Horsepower (in BHP)</Typography>
    <Typography variant="subtitle2" >{obj.engineHp || obj.horsepower_hp}</Typography>
    <Typography variant="caption" display="block" >Number of Gears</Typography>
    <Typography variant="subtitle2" >{obj.numberOfGears}</Typography>
  </Box>
}
