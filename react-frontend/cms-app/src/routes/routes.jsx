import config from '../config';

// Layouts

// Pages
import Home from '../pages/Home';
import Category from '../pages/Category';
import AddCategory from '../pages/Category/AddCategory';
import CategoryDetail from '../pages/Category/CategoryDetail/CategoryDetail';
import Product from '../pages/Product';
import Order from '../pages/Order';
import Voucher from '../pages/Voucher';
import Delivery from '../pages/Delivery';
import User from '../pages/User';
import Customer from '../pages/Customer';
import Statis from '../pages/Statis';

// Public routes
const publicRoutes = [
    { path: config.routes.home, element: Home },

    { path: config.routes.category, element: Category },
    { path: config.routes.addCategory, element: AddCategory },
    { path: config.routes.CategoryDetail, element: CategoryDetail },

    { path: config.routes.product, element: Product },
    { path: config.routes.order, element: Order },
    { path: config.routes.voucher, element: Voucher },
    { path: config.routes.delivery, element: Delivery },
    { path: config.routes.user, element: User },
    { path: config.routes.customer, element: Customer },
    { path: config.routes.statis, element: Statis },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };