import { Router } from 'express';
import userRoutes from './users';
import AuthRoutes from './authenticate';
import ProductRoutes from './products';
import OrderRoutes from './orders';

const {userRouter, userAdminRouter} = userRoutes;
const {productRouter, productAdminRouter, productPublicRouter} = ProductRoutes;
const {orderRouter, orderAdminRouter} = OrderRoutes;

const secureRoutes = new Router();
const publicRoutes = new Router();
const adminRoutes = new Router();

publicRoutes.use('/', AuthRoutes);
publicRoutes.use('/products', productPublicRouter);

secureRoutes.use('/users', userRouter);
secureRoutes.use('/products', productRouter);
secureRoutes.use('/orders', orderRouter);

adminRoutes.use('/products', productAdminRouter);
adminRoutes.use('/users', userAdminRouter)
adminRoutes.use('/orders', orderAdminRouter)


export {
  secureRoutes,
  publicRoutes,
  adminRoutes,
}
