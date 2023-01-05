import {
  Box,
  Typography
} from "@mui/material";

const specs = ['59,900 km', 'Automatic', 'V10', 'Parchery repainted', 'GCC', 'White'];

export default function InfoRow({ data }) {
  return (
    <Box
      sx={{
        mt: '10px',
        display: 'flex'
      }}
    >
      <img
        src={data.imageUrl}
        alt="car"
        style={{
          marginRight: '20px'
        }}
      />
      <Box sx={{
        width: '100%'
      }}>
        <Box sx={{
          display: 'flex',
          fontSize: '18px'
        }}>
          <Typography
            color="#8184A3"
            mr={0.5}
          >
            Highest Bid:
          </Typography>
          <Typography
            color="#1D7DBD"
            fontWeight="bold"
          >AED {data.highestBid}</Typography>
        </Box>

        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '10px',
            width: '100%',
            marginTop: '24px'
          }}
        >
          {data.specs.map((spec, specIndex) => (
            <Box
              key={specIndex}
              sx={{
                width: '33%',
                maxWidth: '150px',
                height: '30px',
                background: '#E8F2F8',
                fontSize: '14px',
                padding: '4px 10px',
                borderRadius: '4px',
                color: '#8184A3'
              }}
            >{spec}</Box>
          ))}
        </Box>
      </Box>
    </Box>
  )
}