// routes
import { PATH_DASHBOARD, PATH_DEALER, PATH_INSPECTOR } from '../../../routes/paths';
// components
import SvgColor from '../../../components/svg-color';

// ----------------------------------------------------------------------
const icon = (name) => (
  <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
);

const ICONS = {
  user: icon('ic_user'),
  users: icon('ic_users'),
  ecommerce: icon('ic_ecommerce'),
  analytics: icon('ic_analytics'),
  dashboard: icon('ic_dashboard'),
  car: icon('ic_car'),
  profile: icon('ic_profile'),
  bid: icon('ic_bid'),
  garage: icon('ic_garage'),
  soldCar: icon('ic_complete'),
  cashback: icon('ic_cashback'),
};

const dealerNavConfig = [

  // MANAGEMENT
  // ----------------------------------------------------------------------
  {
    subheader: 'auction',
    items: [
      {
        title: 'Cars',
        path: PATH_DEALER.cars,
        icon: ICONS.car,
      },
      {
        title: 'My Bids',
        path: PATH_DEALER.bids,
        icon: ICONS.bid,
      }
    ],
  },
  {
    subheader: 'make an offer',
    items: [
      {
        title: 'Completed Auctions',
        path: PATH_DEALER.soldCars,
        icon: ICONS.soldCar,
      },
      {
        title: 'My Offers',
        path: PATH_DEALER.offers,
        icon: ICONS.cashback,
      }
    ],
  },
  {
    subheader: 'management',
    items: [
      {
        title: 'My Account',
        path: PATH_DEALER.account,
        icon: ICONS.profile,
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
        icon: ICONS.users,
      },
      {
        title: 'sellers',
        path: PATH_DASHBOARD.seller.list,
        icon: ICONS.user,
      },
      {
        title: 'cars',
        path: PATH_DASHBOARD.car.list,
        icon: ICONS.garage,
      },
      {
        title: 'My Account',
        path: PATH_DEALER.account,
        icon: ICONS.profile,
      },
    ],
  },
  {
    subheader: 'auction',
    items: [
      {
        title: 'Cars',
        path: PATH_DEALER.cars,
        icon: ICONS.car,
      },
      {
        title: 'My Bids',
        path: PATH_DEALER.bids,
        icon: ICONS.bid,
      }
    ],
  },
  {
    subheader: 'make an offer',
    items: [
      {
        title: 'Completed Auctions',
        path: PATH_DEALER.soldCars,
        icon: ICONS.soldCar,
      },
      {
        title: 'My Offers',
        path: PATH_DEALER.offers,
        icon: ICONS.cashback,
      }
    ],
  },
];

const inspectorNavConfig = [

  // MANAGEMENT
  // ----------------------------------------------------------------------
  {
    subheader: 'management',
    items: [
      {
        title: 'Add Car',
        path: PATH_INSPECTOR.new,
        icon: ICONS.car,
      },
      {
        title: 'My Account',
        path: PATH_INSPECTOR.account,
        icon: ICONS.profile,
      },
    ],
  },
];

export { dealerNavConfig, adminNavConfig, inspectorNavConfig };