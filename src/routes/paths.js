// ----------------------------------------------------------------------

function path(root, sublink) {
  return `${root}${sublink}`;
}

const ROOTS_AUTH = '/auth';
const ROOTS_DASHBOARD = '/dashboard';
const ROOTS_Dealer = '/dealer';
const ROOTS_INSPECTOR = '/inspector';
const ROOTS_HOME = '/';

// ----------------------------------------------------------------------

export const PATH_HOME = {
  root: ROOTS_HOME,
}
export const PATH_AUTH = {
  root: ROOTS_AUTH,
  login: path(ROOTS_AUTH, '/login'),
  register: path(ROOTS_AUTH, '/register'),
  verify: path(ROOTS_AUTH, '/verify'),
  resetPassword: path(ROOTS_AUTH, '/reset-password'),
  newPassword: path(ROOTS_AUTH, '/new-password'),
  emailSent: path(ROOTS_AUTH, '/email-sent-successfully'),
};

export const PATH_DEALER = {
  root: ROOTS_Dealer,
  cars: path(ROOTS_Dealer, '/cars'),
  car: (name) => path(ROOTS_Dealer, `/cars/${name}`),
  account: path(ROOTS_Dealer, '/profile'),
  bids: path(ROOTS_Dealer, '/bids'),
}

export const PATH_INSPECTOR = {
  root: ROOTS_INSPECTOR,
  new: path(ROOTS_INSPECTOR, '/new'),
  account: path(ROOTS_INSPECTOR, '/profile'),
}

export const PATH_DASHBOARD = {
  root: ROOTS_DASHBOARD,
  user: {
    root: path(ROOTS_DASHBOARD, '/user'),
    four: path(ROOTS_DASHBOARD, '/user/four'),
    five: path(ROOTS_DASHBOARD, '/user/five'),
    six: path(ROOTS_DASHBOARD, '/user/six'),
    new: path(ROOTS_DASHBOARD, '/user/new'),
    list: path(ROOTS_DASHBOARD, '/user/list'),
    edit: (name) => path(ROOTS_DASHBOARD, `/user/${name}/edit`),
    account: (name) => path(ROOTS_DASHBOARD, `/user/${name}/account`),
  },
  seller: {
    root: path(ROOTS_DASHBOARD, '/seller'),
    list : path(ROOTS_DASHBOARD, '/seller/list'),
    new : path(ROOTS_DASHBOARD, '/seller/new'),
    edit: (name) => path(ROOTS_DASHBOARD, `/seller/${name}/edit`),
  },
  car: {
    root: path(ROOTS_DASHBOARD, '/car'),
    new: path(ROOTS_DASHBOARD, '/car/new'),
    list: path(ROOTS_DASHBOARD, '/car/list'),
    edit: (name) => path(ROOTS_DASHBOARD, `/car/${name}/edit`),
    view: (name) => path(ROOTS_DASHBOARD, `/car/${name}`),
    details: (name) => path(ROOTS_DASHBOARD, `/car/${name}/details`),
    // shop: path(ROOTS_DASHBOARD, '/e-commerce/shop'),
    // checkout: path(ROOTS_DASHBOARD, '/e-commerce/checkout'),
    // demoEdit: path(ROOTS_DASHBOARD, '/e-commerce/product/nike-blazer-low-77-vintage/edit'),
    // demoView: path(ROOTS_DASHBOARD, '/e-commerce/product/nike-air-force-1-ndestrukt'),
  },
};
