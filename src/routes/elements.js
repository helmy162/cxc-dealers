import { Suspense, lazy } from 'react';
// components
import LoadingScreen from '../components/loading-screen';

// ----------------------------------------------------------------------

const Loadable = (Component) => (props) =>
(
  <Suspense fallback={<LoadingScreen />}>
    <Component {...props} />
  </Suspense>
);

// ----------------------------------------------------------------------

// auth
export const LoginPage = Loadable(lazy(() => import('../pages/auth/LoginPage')));
export const RegisterPage = Loadable(lazy(() => import('../pages/auth/RegisterPage')));
export const ResetPasswordPage = Loadable(lazy(() => import('../pages/auth/ResetPasswordPage')));

// home
export const HomePage = Loadable(lazy(() => import('../pages/HomePage')));

// dealer
export const SingleCar = Loadable(lazy(() => import('../pages/dealer/SingleCar')));
export const BidsPage = Loadable(lazy(() => import('../pages/dealer/BidsPage')));

// admin
export const CarsListingPage = Loadable(lazy(() => import('../pages/CarsListingPage')));
export const UserListPage = Loadable(lazy(() => import('../pages/dashboard/UserListPage')));
export const UserCreatePage = Loadable(lazy(() => import('../pages/dashboard/UserCreatePage')));
export const UserAccountPage = Loadable(lazy(() => import('../pages/dashboard/UserAccountPage')));
export const UserEditPage = Loadable(lazy(() => import('../pages/dashboard/UserEditPage')));
export const SellerListPage = Loadable(lazy(() => import('../pages/dashboard/SellerListPage')));
export const SellerCreatePage = Loadable(lazy(() => import('../pages/dashboard/SellerCreatePage')));
export const SellerEditPage = Loadable(lazy(() => import('../pages/dashboard/SellerEditPage')));
export const AddCarPage = Loadable(lazy(() => import('../pages/dashboard/AddCarPage')));

export const EcommerceProductListPage = Loadable(
  lazy(() => import('../pages/dashboard/EcommerceProductListPage'))
);
export const EcommerceProductCreatePage = Loadable(
  lazy(() => import('../pages/dashboard/EcommerceProductCreatePage'))
);
export const EcommerceProductDetailsPage = Loadable(
  lazy(() => import('../pages/dashboard/EcommerceProductDetailsPage'))
);
export const CarDetails = Loadable(
  lazy(() => import('../pages/dashboard/CarDetails'))
);
export const EcommerceProductEditPage = Loadable(
  lazy(() => import('../pages/dashboard/EcommerceProductEditPage'))
);
export const Page404 = Loadable(lazy(() => import('../pages/Page404')));
