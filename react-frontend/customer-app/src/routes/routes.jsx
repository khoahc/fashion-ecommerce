import config from '../config';

// Layouts
// import { HeaderOnly } from '../layouts';

// Pages
import Home from '../pages/Home';
import Catelog from '../pages/Catelog';
// import Profile from '../pages/Profile';
import Product from '../pages/Product';
import Search from '../pages/Search';
import Cart from '../pages/Cart';

// Public routes
const publicRoutes = [
    { path: config.routes.home, element: Home },
    { path: config.routes.cart, element: Cart },
    { path: config.routes.category, element: Catelog },
    //{ path: config.routes.product, element: Product, layout: HeaderOnly },
    { path: config.routes.product, element: Product},
    { path: config.routes.search, element: Search, layout: null },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };