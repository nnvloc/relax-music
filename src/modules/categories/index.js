import { Router } from 'express';
import trycatchWrapper from '@utils/trycatchWrapper';
import Controller from './controller';

const router = new Router();
const publicRouter = new Router();
const adminRouter = new Router();


// Get users
router.get('/', trycatchWrapper((req, res, next) => {
  return Controller.getCategories(req, res, next);
}));

router.post('/', trycatchWrapper((req, res, next) => {
  return Controller.createCategory(req, res, next);
}));

export default {
  categoryPublicRouter: publicRouter,
  categoryRouter: router,
  categoryAdminRouter: adminRouter,
}
