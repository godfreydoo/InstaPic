import passport from 'passport';
import LocalStrategy from 'passport-local';
import { findUserByUsername, validatePassword } from './db';

passport.serializeUser((user, done) => {
  done(null, user.username);
});

passport.deserializeUser((req, username, done) => {
  const user = findUserByUsername(req, username);
  done(null, user);
});

passport.use(new LocalStrategy({ passReqToCallback: true }, async (req, username, password, done) => {
  const user = await findUserByUsername(req, username);

  if (user === undefined || validatePassword(user, password) === false) {
    return done(null, null);
  } else {
    return done(null, user);
  }
}));

export default passport;