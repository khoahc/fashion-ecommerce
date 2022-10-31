const routes = {
  home: '/',
  category: '/c/:slugCategory',
  cart: '/cart',
  profile: '/member/@:nickname',  
  product: '/p/:slugProduct',
  search: '/search',
  login: '/login',
  register: '/register',
  checkout: '/checkout'
};

export default routes;