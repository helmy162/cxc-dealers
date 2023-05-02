import {
  Box,
  Typography,
  Link,
} from "@mui/material"

export default function ResultsCount() {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottom: '1px solid #DFDFDF',
        padding: '31px 38px',
      }}
    >
      <Typography
        sx={{
          fontSize: '18px',
          color: '#8184A3',
        }}
      >
        Showing
        <Typography 
          variant="span"
          sx={{
            color: '#127BBF'
          }}
        >
          {` 7 `}
        </Typography>
        results <br />
        of 237 items.
      </Typography>

      <Link
        href="/dealer/cars"
        sx={{
          color: '#127BBF',
          fontSize: '18px',
          fontWeight: 500
        }}
      >
        Reset All
      </Link>
    </Box>
  )
}