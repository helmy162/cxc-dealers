import { Helmet } from 'react-helmet-async';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
// @mui
import { Container, Typography} from '@mui/material';
// redux
import { useDispatch, useSelector } from '../../redux/store';
import { getProductAsAdmin } from '../../redux/slices/product';

import { useSettingsContext } from '../../components/settings';
// sections
import AddCar from '../../sections/AddCar';
// ----------------------------------------------------------------------

export default function EcommerceProductEditPage() {
  const { themeStretch } = useSettingsContext();

  const dispatch = useDispatch();

  const { name } = useParams();
  const { productAsAdmin} = useSelector((state) => state.product);


  useEffect(() => {
    if (name) {
      dispatch(getProductAsAdmin(name));
    }
  }, [dispatch, name]);

  return (
    <>
      <Helmet>
        <title> Cars: Edit Car | CarsXchange</title>
      </Helmet>

      <Container maxWidth={themeStretch ? false : 'xl'}>
        <Typography variant="h3" component="h1" paragraph>
          Edit car
        </Typography>
        
        <AddCar car={productAsAdmin} isEdit={true} />
      </Container>
    </>
  );
}
