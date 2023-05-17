
import {
  Box,
  Typography
} from "@mui/material";


export default function CarName({ data}) {

  return (
      <Typography variant="h4" sx={{
        fontSize: { xs: '12px', sm: '20px' },
      }}>
        {data.details.make + ' ' + data.details.model + ' ' + data.details.year}
      </Typography>
  )
}