import { Router } from 'express';
import AuthRoutes from './authenticate';
import ProductRoutes from './products';
import CategoryRoutes from './categories';

const {productRouter, productAdminRouter, productPublicRouter} = ProductRoutes;
const {categoryRouter, categoryPublicRouter, categoryAdminRouter} = CategoryRoutes;

const secureRoutes = new Router();
const publicRoutes = new Router();
const adminRoutes = new Router();

publicRoutes.use('/', AuthRoutes);
publicRoutes.use('/products', productPublicRouter);

secureRoutes.use('/products', productRouter);
secureRoutes.use('/categories', categoryRouter);

adminRoutes.use('/products', productAdminRouter);
adminRoutes.use('/categories', categoryAdminRouter)


export {
  secureRoutes,
  publicRoutes,
  adminRoutes,
}
