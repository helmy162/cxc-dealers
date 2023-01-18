import { Box } from '@mui/material';

export default function SpecItem({ children }) {
  return (
    <Box
      sx={{
        width: { xs: '48%', sm: 'auto', md: '33%' },
        maxWidth: { xs: '100%', sm: 'auto', md: '150px' },
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
    >
      {children}
    </Box>
  )
}