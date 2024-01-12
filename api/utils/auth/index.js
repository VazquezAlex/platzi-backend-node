// Third-party imports.
const passport = require('passport');

// Local imports.
const LocalStrategy = require('./strategies/local.strategy');
const JwtStrategy = require('./strategies/jwt.strategy');
const GQLLocalStrategy = require('./strategies/local-gql.strategy');

// Use possport-local strategy.
passport.use(LocalStrategy);
passport.use(JwtStrategy);
passport.use(GQLLocalStrategy);
