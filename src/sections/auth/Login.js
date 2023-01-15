// @mui
import { Stack, Typography, Link } from '@mui/material';
import { PATH_AUTH } from '../../routes/paths';
// layouts
import LoginLayout from '../../layouts/login';
//
import AuthLoginForm from './AuthLoginForm';

// ----------------------------------------------------------------------

export default function Login() {
  return (
    <LoginLayout>
      <Stack spacing={2} sx={{ mb: 5, position: 'relative' }}>
        <Typography variant="h4">Sign in</Typography>

        <Stack direction="row" spacing={0.5}>
          <Typography variant="body2">New user?</Typography>

          <Link variant="subtitle2" href={PATH_AUTH.register}>Create an account</Link>
        </Stack>
      </Stack>

      <AuthLoginForm />
    </LoginLayout>
  );
}
