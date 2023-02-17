import { Helmet } from 'react-helmet-async';
// @mui
import { Container } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// components
import { useSettingsContext } from '../../components/settings';
import CustomBreadcrumbs from '../../components/custom-breadcrumbs';
// sections
import SellerNewEditForm from '../../sections/@dashboard/seller/SellerNewEditForm';

// ----------------------------------------------------------------------

export default function SellerCreatePage() {
  const { themeStretch } = useSettingsContext();

  return (
    <>
      <Helmet>
        <title> Seller: Create a new seller | CarsXchange</title>
      </Helmet>

      <Container maxWidth={themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading="Create a new seller"
          links={[
            {
              name: 'Dashboard',
              href: PATH_DASHBOARD.root,
            },
            {
              name: 'Users',
              href: PATH_DASHBOARD.user.list,
            },
            { name: 'New user' },
          ]}
        />
        <SellerNewEditForm />
      </Container>
    </>
  );
}
