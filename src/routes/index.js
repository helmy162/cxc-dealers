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
  CarsListingPage,
  UserListPage,
  UserCreatePage,
  UserAccountPage,
  UserEditPage,
  EcommerceProductListPage,
  EcommerceProductEditPage,
  EcommerceProductDetailsPage,
  AddCarPage,
  CarDetails,
  HomePage,
  SingleCar
} from './elements';
import { PATH_AUTH } from './paths';

// ----------------------------------------------------------------------

export default function Router() {
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
            { path: 'reset-password', element: <ResetPasswordPage /> },
            // { path: 'new-password', element: <NewPasswordPage /> },
            // { path: 'verify', element: <VerifyCodePage /> },
          ],
        },
      ],
    },
    {
      path: 'dealer',
      element: (
        <AuthGuard>
          <DashboardLayout type='dealer'/>
        </AuthGuard>
      ),
      children: [
        { element: <Navigate to={'cars'} replace />, index: true }, // this is the default page for the dealer
        { path: 'cars', element: <CarsListingPage /> }, // this is the car listing page
        { path: 'cars/:name', element: <SingleCar />}, // this is the single car details page
        { path: 'profile', element: <UserAccountPage isProfile={true} /> },
        // other user pages...
      ],
    },    
    {
      path: '/dashboard',
      element: (
        <AuthGuard>
          <AdminGuard>
            <DashboardLayout type='admin'/>
          </AdminGuard>
        </AuthGuard>
      ),
      children: [
        { element: <Navigate to={PATH_AFTER_LOGIN} replace />, index: true },
        {
          path: 'car',
          children: [
            { element: <Navigate to="/dashboard/car/list" replace />, index: true },
            { path: 'list', element: <EcommerceProductListPage /> },
            { path: 'new', element: <AddCarPage /> },
            { path: ':name/edit', element: <EcommerceProductEditPage /> },
            { path: ':name', element: <EcommerceProductDetailsPage /> },
            { path: ':name/details', element: <CarDetails /> },
          ],
        },
        {
          path: 'user',
          children: [
            { element: <Navigate to="/dashboard/user/list" replace />, index: true },
            { path: 'new', element: <UserCreatePage /> },
            { path: ':name/edit', element: <UserEditPage /> },
            { path: 'list', element: <UserListPage /> },
            { path: ':name/account', element: <UserAccountPage /> },
          ],
        },
      ],
    },
    {
      path: ':name/inspection',
      element: 
        <div className='max-w-[1000px] p-[12px] m-auto'>
          <CarDetails />
        </div>,
    },

    {
      element: <CompactLayout />,
      children: [{ path: '404', element: <Page404 /> }],
    },
    { path: '*', element: <Navigate to="/404" replace /> },
  ]);
}
