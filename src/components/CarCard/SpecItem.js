import { Box } from '@mui/material';

export default function SpecItem({ children }) {
  return (
    <Box
      sx={{
        width: '30%',
        // maxWidth: { xs: '100%', sm: 'auto', md: '150px' },
        minWidth: 'fit-content',
        flexGrow: 1,
        textAlign: 'center',
        height: '30px',
        background: '#E8F2F8',
        fontSize: '14px',
        padding: '4px 10px',
        borderRadius: '4px',
        color: '#8184A3',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
        overflow: 'hidden',
        textTransform: 'capitalize',
      }}
    >
      {children}
    </Box>
  )
}