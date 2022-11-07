const routes = {
  home: '/',
  category: '/c/:slugCategory',
  cart: '/cart',
  profile: '/member/@:nickname',  
  product: '/p/:slugProduct',
  search: '/search',
  orderTracker: '/order-tracker',
  orderTrackerDetail: '/order-tracker-detail',
  login: '/login',
  register: '/register',
  checkout: '/checkout',
  verifyOrderSuccessful: '/order/verifySuccessful',
  verifyOrderFail: '/order/verifyFail',
  verifyOrder: '/order/verify'
};

export default routes;