import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { paramCase } from 'change-case';
import { useParams } from 'react-router-dom';
// @mui
import { Container } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// _mock_
import { _userList } from '../../_mock/arrays';
// components
import { useSettingsContext } from '../../components/settings';
import CustomBreadcrumbs from '../../components/custom-breadcrumbs';
// sections
import SellerNewEditForm from '../../sections/@dashboard/seller/SellerNewEditForm';
// redux
import { useDispatch, useSelector } from '../../redux/store';
import { getUsers, getSeller} from '../../redux/slices/user';

// ----------------------------------------------------------------------

export default function UserEditPage() {
  const { themeStretch } = useSettingsContext();

  const { name } = useParams();
  const dispatch = useDispatch();
  const {seller} = useSelector((state) => state.user);

useEffect(() => {
  dispatch(getSeller(name));
}, [dispatch, name]);

  return (
    <>
      <Helmet>
        <title> Seller: Edit seller | CarsXchange</title>
      </Helmet>

      <Container maxWidth={themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading="Edit seller"
          links={[
            {
              name: 'Dashboard',
              href: PATH_DASHBOARD.root,
            },
            {
              name: 'Sellers',
              href: PATH_DASHBOARD.seller.list,
            },
            { name: seller?.name },
          ]}
        />

        <SellerNewEditForm isEdit currentUser={seller} />
      </Container>
    </>
  );
}
