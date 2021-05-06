import { Router } from 'express';
import trycatchWrapper from '@utils/trycatchWrapper';
import Controller from './controller';

const router = new Router();
const adminRouter = new Router();

// Get users
router.get('/', trycatchWrapper((req, res, next) => {
  return Controller.getMyOrders(req, res, next);
}));

router.get('/:id', trycatchWrapper((req, res, next) => {
  return Controller.getOrderById(req, res, next);
}));

router.post('/',trycatchWrapper((req, res, next) => {
  return Controller.createOrder(req, res, next);
}));

adminRouter.get('/', trycatchWrapper((req, res, next) => {
  return Controller.getAllOrders(req, res, next);
}));

export default {
  orderRouter: router,
  orderAdminRouter: adminRouter,
}
