import { Helmet } from 'react-helmet-async';
// @mui
import { Container, Typography} from '@mui/material';

import { useSettingsContext } from '../../components/settings';


// sections
import AddCar from '../../sections/AddCar';

// ----------------------------------------------------------------------

export default function AddCarPage() {
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
