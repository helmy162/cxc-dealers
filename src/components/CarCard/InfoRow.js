import {
  Box,
  Typography
} from "@mui/material";

export default function InfoRow({ data }) {
  return (
    <Box
      sx={{
        mt: '10px',
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' }
      }}
    >
      <img
        src={data.imageUrl}
        alt="car"
        style={{
          marginRight: '20px',
          maxWidth: { xs: '100%', md: '265px' }
        }}
      />
      <Box sx={{
        width: '100%'
      }}>
        <Box sx={{
          display: 'flex',
          fontSize: '18px',
          marginTop: { xs: '20px', md: 0 }
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
            marginTop: '24px',
            paddingBottom: { xs: '51px', md: 0 }
          }}
        >
          {data.specs.map((spec, specIndex) => (
            <Box
              key={specIndex}
              sx={{
                width: { xs: '48%', md: '33%' },
                maxWidth: { xs: '100%', md: '150px' },
                height: '30px',
                background: '#E8F2F8',
                fontSize: '14px',
                padding: '4px 10px',
                borderRadius: '4px',
                color: '#8184A3',
                whiteSpace: 'nowrap',
                textOverflow: 'ellipsis',
                overflow: 'hidden'
              }}
            >{spec}</Box>
          ))}
        </Box>
      </Box>
    </Box>
  )
}