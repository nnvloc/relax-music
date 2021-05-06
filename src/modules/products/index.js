import { Router } from 'express';
import trycatchWrapper from '@utils/trycatchWrapper';
import Controller from './controller';

const router = new Router();
const publicRouter = new Router();
const adminRouter = new Router();


// Get users
publicRouter.get('/', trycatchWrapper((req, res, next) => {
  return Controller.getProducts(req, res, next);
}));

adminRouter.post('/', trycatchWrapper((req, res, next) => {
  return Controller.createProduct(req, res, next);
}));

adminRouter.put('/:id', trycatchWrapper((req, res, next) => {
  return Controller.editProduct(req, res, next);
}));

adminRouter.delete('/:id', trycatchWrapper((req, res, next) => {
  return Controller.removeProduct(req, res, next);
}));

export default {
  productPublicRouter: publicRouter,
  productRouter: router,
  productAdminRouter: adminRouter,
}
