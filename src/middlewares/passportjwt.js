import passport from 'passport';
import {Strategy as JwtStrategy} from 'passport-jwt';
import { ExtractJwt } from 'passport-jwt';

let opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.JWT_SECRET_KEY;
passport.use(new JwtStrategy(opts, async function(jwtPayload, done) {
  const {
    secretKey,
  } = jwtPayload;

  if (!secretKey) {
    return done(new Error('Unauthorized'), false);
  }
  
  if (secretKey === process.env.LOGIN_SECRET_KEY) {
    return done(null, true);
  } else {
      return done(null, false);
      // or you could create a new account
  }
}));
