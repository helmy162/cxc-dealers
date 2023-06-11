import { Navigate, useRoutes } from 'react-router-dom';
// auth
import AuthGuard from '../auth/AuthGuard';
import GuestGuard from '../auth/GuestGuard';
import AdminGuard from '../auth/AdminGuard';
// layouts
import CompactLayout from '../layouts/compact';
import DashboardLayout from '../layouts/dashboard';
// config
import { PATH_AFTER_LOGIN } from '../config-global';
//
import {
  Page404,
  LoginPage,
  RegisterPage,
  ResetPasswordPage,
  NewPasswordPage,
  EmailSentPage,
  AccountCreatedSuccessfully,
  VerifyCodePage,
  CarsListingPage,
  UserListPage,
  UserCreatePage,
  UserAccountPage,
  UserEditPage,
  SellerListPage,
  SellerCreatePage,
  SellerEditPage,
  EcommerceProductListPage,
  EcommerceProductEditPage,
  EcommerceProductDetailsPage,
  AddCarPage,
  CarDetails,
  CarDetailsPage,
  HomePage,
  SingleCar,
  SoldCar,
  BidsPage,
  OffersPage,
  AppointmentsPage,
} from './elements';
import { PATH_AUTH } from './paths';
import RoleBasedGuard from 'src/auth/RoleBasedGuard';
import { useAuthContext } from 'src/auth/useAuthContext';

// ----------------------------------------------------------------------

export default function Router() {
  const {user} = useAuthContext();

  return useRoutes([
    {
      path: '/',
      children: [
        // { element: <HomePage />, index: true },
        { element: <Navigate to={PATH_AFTER_LOGIN} replace />, index: true },
        {
          path: PATH_AUTH.login,
          element: (
            <GuestGuard>
              <LoginPage />
            </GuestGuard>
          ),
        },
        {
          path: PATH_AUTH.register,
          element: (
            <GuestGuard>
              <RegisterPage />
            </GuestGuard>
          ),
        },
        {
          element: <CompactLayout />,
          children: [
            { path: PATH_AUTH.resetPassword, element: <ResetPasswordPage /> },
            { path: PATH_AUTH.newPassword, element: <NewPasswordPage /> },
            { path: PATH_AUTH.emailSent, element: <EmailSentPage /> },
            { path: PATH_AUTH.accountCreated, element: <AccountCreatedSuccessfully /> },
          ],
        },
      ],
    },
    {
      path: 'dealer',
      element: (
        <AuthGuard>
          <RoleBasedGuard hasContent roles={['dealer', 'admin', 'sales']}>
            <DashboardLayout/>
          </RoleBasedGuard>
        </AuthGuard>
      ),
      children: [
        { element: <Navigate to={'cars'} replace />, index: true }, // this is the default page for the dealer
        { path: 'cars', element: <CarsListingPage /> }, // this is the car listing page
        { path: 'cars/:name', element: <SingleCar />}, // this is the single car details page
        { path: 'completed-auctions', element: <CarsListingPage expired={true}/> }, // this is the completed auctions listing page
        { path: 'completed-auctions/:name', element: <SoldCar />}, // this is the single completed auction page
        { path: 'bids', element: <BidsPage /> },
        { path: 'offers', element: <OffersPage /> },
        // other dealer pages...
      ],
    },
    {
      path: '/dashboard',
      element: (
        <AuthGuard>
            <DashboardLayout />
        </AuthGuard>
      ),
      children: [
        { element: <Navigate to={PATH_AFTER_LOGIN} replace />, index: true },
        {
          path: 'car',
          children: [
            { element: <Navigate to="/dashboard/car/list" replace />, index: true },
            { path: 'list', element: <RoleBasedGuard hasContent roles={['admin','closer', 'sales']}> <EcommerceProductListPage /> </RoleBasedGuard> },
            { path: 'new', element: <RoleBasedGuard hasContent roles={['admin']}> <AddCarPage/> </RoleBasedGuard> },
            { path: ':name/edit', element: <RoleBasedGuard hasContent roles={['admin']}> <EcommerceProductEditPage/> </RoleBasedGuard> },
            { path: ':name', element: <RoleBasedGuard hasContent roles={['admin', 'closer', 'sales']}> <EcommerceProductDetailsPage/> </RoleBasedGuard> },
            { path: ':name/details', element: <RoleBasedGuard hasContent roles={['admin', 'closer', 'sales']}> <CarDetails/> </RoleBasedGuard>},
          ],
        },
        {
          path: 'appointment',
          children: [
            { element: <Navigate to="/dashboard/appointment/list" replace />, index: true },
            { path: 'list', element: <RoleBasedGuard hasContent roles={['admin','closer', 'sales']}> <AppointmentsPage /> </RoleBasedGuard> },
          ],
        },
        {
          path: 'user',
          children: [
            { element: <Navigate to="/dashboard/user/list" replace />, index: true },
            { path: 'new', element: <RoleBasedGuard hasContent roles={['admin']}> <UserCreatePage/> </RoleBasedGuard> },
            { path: ':name/edit', element: <RoleBasedGuard hasContent roles={['admin']}> <UserEditPage/> </RoleBasedGuard> },
            { path: 'list', element: <RoleBasedGuard hasContent roles={['admin', 'sales']}> <UserListPage/> </RoleBasedGuard> },
            // { path: ':name/account', element: <UserAccountPage /> },
          ],
        },
        {
          path: 'seller',
          children: [
            { element: <Navigate to="/dashboard/seller/list" replace />, index: true },
            { path: 'new', element: <RoleBasedGuard hasContent roles={['admin', 'closer']}> <SellerCreatePage /> </RoleBasedGuard>},
            { path: ':name/edit', element: <RoleBasedGuard hasContent roles={['admin', 'closer']}> <SellerEditPage /> </RoleBasedGuard> },
            { path: 'list', element: <RoleBasedGuard hasContent roles={['admin', 'closer']}> <SellerListPage /> </RoleBasedGuard> },
            // { path: ':name/account', element: <UserAccountPage /> },
          ],
        }
      ],
    },
    {
      path: '/',
      element: (
        <AuthGuard>
          <DashboardLayout />
        </AuthGuard>
      ),
      children: [
        { element: <Navigate to={'/profile'} replace />, index: true },
        { path: 'profile', element: <UserAccountPage isProfile={true} /> },
      ],
    },
    {
      path: '/inspector',
      element: (
        <AuthGuard>
          <RoleBasedGuard hasContent roles={['inspector']}>
            <DashboardLayout />
          </RoleBasedGuard>
        </AuthGuard>
      ),
      children: [
        { element: <Navigate to={'/inspector/new'} replace />, index: true }, // this is the default page for the inspector
        { path: 'new', element: <AddCarPage /> }, // this is the car listing page
        { path: 'profile', element: <UserAccountPage isProfile={true} /> },
      ],
    },
    {
      path: ':name/inspection',
      element: 
        <div className='max-w-[1000px] p-[12px] m-auto'>
          <CarDetailsPage />
        </div>,
    },

    {
      element: <CompactLayout />,
      children: [{ path: '404', element: <Page404 /> }],
    },
    { path: '*', element: <Navigate to="/404" replace /> },
  ]);
}
