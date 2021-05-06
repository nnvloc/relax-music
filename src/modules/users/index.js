import { Router } from 'express';
import trycatchWrapper from '@utils/trycatchWrapper';
import Controller from './controller';

const router = new Router();
const adminRouter = new Router();

// Get users
adminRouter.get('/', (req, res, next) => {
  // pre-process
  return Controller.getUsers(req, res, next);
});

router.get('/profile', trycatchWrapper((req, res, next) => {
  return Controller.getProfile(req, res, next);
}));

adminRouter.post('/', Controller.createUser);

// Get user by id
adminRouter.get('/:id', Controller.getUserById);

export default {
  userRouter: router,
  userAdminRouter: adminRouter,
};
