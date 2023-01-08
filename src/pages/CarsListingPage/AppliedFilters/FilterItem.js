import {
  Box,
} from '@mui/material';

export default function AppliedFilterItem({ children }) {
  return (
    <Box
      sx={{
        background: "#1D7DBD",
        color: 'white',
        borderRadius: '4px',
        padding: '5px 10px',
        fontSize: '14px',
        fontWeight: 500
      }}
    >
      {children}
    </Box>
  )
}