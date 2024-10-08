import {
  Box,
  Typography
} from '@mui/material';

export default function SoldCarsCount({ count }) {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        margin:'auto',
        marginBottom: '20px'
      }}
    >
      <Box
        sx={{
          height: '23px',
          width: '23px'
        }}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M21.0261 1.74294C20.7586 0.877168 20.0283 0.260864 19.1739 0.260864H4.82609C3.97173 0.260864 3.2413 0.877168 2.9739 1.74294L0.260864 10.5326V22.2717C0.260864 23.0788 0.847821 23.7391 1.56521 23.7391H2.86956C3.59348 23.7391 4.17391 23.0788 4.17391 22.2717V20.8043H19.8261V22.2717C19.8261 23.0788 20.413 23.7391 21.1304 23.7391H22.4348C23.1587 23.7391 23.7391 23.0788 23.7391 22.2717V10.5326L21.0261 1.74294ZM4.82609 16.4022C3.74347 16.4022 2.86956 15.4191 2.86956 14.201C2.86956 12.9831 3.74347 12 4.82609 12C5.90868 12 6.78261 12.9831 6.78261 14.201C6.78261 15.4191 5.90868 16.4022 4.82609 16.4022ZM19.1739 16.4022C18.0914 16.4022 17.2173 15.4191 17.2173 14.201C17.2173 12.9831 18.0914 12 19.1739 12C20.2565 12 21.1304 12.9831 21.1304 14.201C21.1304 15.4191 20.2565 16.4022 19.1739 16.4022ZM2.86956 9.06521L4.82609 2.46195H19.1739L21.1304 9.06521H2.86956Z" fill="#127BBF" />
        </svg>
      </Box>
      <Typography
        sx={{
          fontSize: '24px',
          fontWeight: 500
        }}
      >
        {count} Cars
      </Typography>
    </Box>
  )
}