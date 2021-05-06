import 'module-alias/register';
import passport from 'passport';
import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import CORS from 'cors';
import {
	publicRoutes,
	secureRoutes,
	adminRoutes,
} from '@modules';

import passportjwt from '@middlewares/passportjwt';
import adminValidatorMiddleware from '@middlewares/adminValidate';
import db from '@models';

db.sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
});

const app = express();
app.use(CORS());
app.use(express.static(path.join(__dirname, './')));

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use(passport.initialize());

app.use('/api', publicRoutes);
app.use('/api', passport.authenticate('jwt', { session: false }), secureRoutes);
app.use('/api/admin', passport.authenticate('jwt', { session: false }), adminValidatorMiddleware, adminRoutes);

// Error handling
app.use((err, req, res, next) => {
	if (process.env.NODE_ENV === 'development') {
		console.log('error: ', err);
  }
  
  // Custom Errorhandling
  // E.g: Call sentry.io (err)

	res.status(500);
	console.log('err.message: ', err.message);
	let errorMsg = process.env.NODE_ENV === 'development' ? err.message : 'general server error!';
	if (
		err.status === 401
		|| err.status === 400
		|| err.status === 409
	) {
		res.status(err.status);
		errorMsg = err.message;
	}

	res.json({
		success: false,
		error_message: errorMsg,
	});
});

module.exports = app;
