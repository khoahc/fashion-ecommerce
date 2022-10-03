import config from '../config';

// Layouts
import NoHeaderLayout from '../layouts/NoHeaderLayout';

// Pages
import Home from '../pages/Home';
import Catalog from '../pages/Catalog/Catalog';
// import Profile from '../pages/Profile';
import Product from '../pages/Product';
import Search from '../pages/Search';
import Cart from '../pages/Cart';
import Page404 from '../pages/Page404';

// Public routes
const publicRoutes = [
    { path: config.routes.home, element: Home },
    { path: config.routes.cart, element: Cart },
    { path: config.routes.category, element: Catalog, layout: NoHeaderLayout},
    //{ path: config.routes.product, element: Product, layout: HeaderOnly },
    { path: config.routes.product, element: Product},
    { path: config.routes.search, element: Search, layout: null },
    { path: "/*", element: Page404, layout: NoHeaderLayout },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };