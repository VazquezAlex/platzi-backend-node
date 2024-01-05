// Third-party imports.
const passport = require('passport');

// Local imports.
const LocalStrategy = require('./strategies/local.strategy');

// Use possport-local strategy.
passport.use(LocalStrategy);
