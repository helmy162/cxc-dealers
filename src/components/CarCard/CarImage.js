import { useMemo } from "react";

import {
  Box,
  Typography
} from "@mui/material";


export default function CarImage({ data}) {

  const image = useMemo(() => {
    return data.images && data?.images[0] ? `https://dealer.phoenixtechs.net/storage/car_images/${data.images[0]}` : ''
  }, [data])

  return (
    <Box sx={{
      marginRight: { xs: '0px', sm: '20px' },
      maxWidth: { xs: '130px', sm: '265px' },
      minWidth: { xs: '130px', sm: '265px' },
    }}>
      <img
        src={image}
        alt="car"
        style={{
          width: '100%',
          aspectRatio: '16/9',
          objectFit: 'cover',
          borderRadius: '8px'
        }}
      />
    </Box>
  )
}