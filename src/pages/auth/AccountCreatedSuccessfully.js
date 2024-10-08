import { Helmet } from 'react-helmet-async';
import { Link as RouterLink } from 'react-router-dom';
// @mui
import { Link, Typography } from '@mui/material';
// routes
import { PATH_AUTH } from '../../routes/paths';
// components
import Iconify from '../../components/iconify';
// assets
import { EmailInboxIcon, SentIcon} from '../../assets/icons';

// ----------------------------------------------------------------------

export default function AccountCreatedSuccessfully() {
  return (
    <>
      <Helmet>
        <title> Account Created Successfully | Carsxchange</title>
      </Helmet>

      <EmailInboxIcon sx={{ mb: 5, height: 96 }} />

      <Typography variant="h3" paragraph>
       Your account has been created successfully!, However an admin needs to accept your email address before you can login.
      </Typography>

      <Typography sx={{ color: 'text.secondary', mb: 5 }}>
       If you have any questions, please contact the admin
      </Typography>

      <Link
        component={RouterLink}
        to={PATH_AUTH.login}
        color="inherit"
        variant="subtitle2"
        sx={{
          mx: 'auto',
          alignItems: 'center',
          display: 'inline-flex',
        }}
      >
        <Iconify icon="eva:chevron-left-fill" width={16} />
        Return to sign in
      </Link>
    </>
  );
}
