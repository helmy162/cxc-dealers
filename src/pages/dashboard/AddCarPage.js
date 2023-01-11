import { Helmet } from 'react-helmet-async';
// @mui
import { Container, Typography } from '@mui/material';
// components
import AddCar from '../../sections/AddCar';
import { useSettingsContext } from '../../components/settings';

// ----------------------------------------------------------------------

export default function PageOne() {
  const { themeStretch } = useSettingsContext();

  return (
    <>
      <Helmet>
        <title> Add car</title>
      </Helmet>

      <Container maxWidth={themeStretch ? false : 'xl'}>
        <Typography variant="h3" component="h1" paragraph>
          Add car
        </Typography>
        <AddCar />
      </Container>
    </>
  );
}
