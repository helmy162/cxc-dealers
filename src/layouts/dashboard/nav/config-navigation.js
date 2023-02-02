// routes
import { PATH_DASHBOARD, PATH_DEALER } from '../../../routes/paths';
// components
import SvgColor from '../../../components/svg-color';

// ----------------------------------------------------------------------
const icon = (name) => (
  <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
);

const ICONS = {
  user: icon('ic_user'),
  ecommerce: icon('ic_ecommerce'),
  analytics: icon('ic_analytics'),
  dashboard: icon('ic_dashboard'),
  car: icon('ic_car'),
};

const dealerNavConfig = [

  // MANAGEMENT
  // ----------------------------------------------------------------------
  {
    subheader: 'bidding',
    items: [
      {
        title: 'Cars',
        path: PATH_DEALER.cars,
        icon: ICONS.car,
      },
    ],
  },
  {
    subheader: 'management',
    items: [
      {
        title: 'My Account',
        path: PATH_DEALER.account,
        icon: ICONS.user,
      },
    ],
  },
];

const adminNavConfig = [

  // MANAGEMENT
  // ----------------------------------------------------------------------
  {
    subheader: 'management',
    items: [
      {
        title: 'users',
        path: PATH_DASHBOARD.user.list,
        icon: ICONS.user,
      },
      {
        title: 'cars',
        path: PATH_DASHBOARD.car.list,
        icon: ICONS.car,
      },
    ],
  },
];

export { dealerNavConfig, adminNavConfig };