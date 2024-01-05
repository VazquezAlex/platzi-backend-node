// Third-party imports.
const passport = require('passport');

// Local imports.
const LocalStrategy = require('./strategies/local.strategy');
const JwtStrategy = require('./strategies/jwt.strategy');

// Use possport-local strategy.
passport.use(LocalStrategy);
passport.use(JwtStrategy);
