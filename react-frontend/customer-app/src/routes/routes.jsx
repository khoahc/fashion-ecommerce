import config from "../config";

// Layouts
import NoHeaderLayout from "../layouts/NoHeaderLayout";

// Pages
import Home from "../pages/Home";
import Catalog from "../pages/Catalog/Catalog";
// import Profile from '../pages/Profile';
import Product from "../pages/Product";
import Search from "../pages/Search";
import Cart from "../pages/Cart/Cart";
import Page404 from "../pages/Page404";
import Checkout from "../pages/Checkout/Checkout";
import VerifyOrder from "../pages/VerifyOrder/VerifyOrder";
import OrderTracker from "../pages/OrderTracker";

// Public routes
const publicRoutes = [
  { path: config.routes.home, element: Home },
  { path: config.routes.cart, element: Cart, layout: NoHeaderLayout },
  { path: config.routes.category, element: Catalog, layout: NoHeaderLayout },
  { path: config.routes.checkout, element: Checkout, layout: NoHeaderLayout },
  { path: config.routes.product, element: Product, layout: NoHeaderLayout },
  { path: config.routes.orderTracker, element: OrderTracker, layout: NoHeaderLayout },
  { path: config.routes.search, element: Search, layout: null },
  {
    path: config.routes.verifyOrder,
    element: VerifyOrder,
    layout: NoHeaderLayout,
  },
  { path: "/*", element: Page404, layout: NoHeaderLayout },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
