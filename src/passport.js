import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { ExtractJwt, Strategy as JWTStrategy } from 'passport-jwt';
import User from './models/User.js';
import config from './config.js';

passport.use(new LocalStrategy(
    {
        usernameField: 'email',
        passwordField: 'password'
    },
    (email, password, cb) => {
        return User.findOne({email})
            .then(async (user) => {
                const passwordValid = await user.isValidPassword(password);
                if (!user || !passwordValid) return cb(null, false, { message: 'Incorect email or password' });
                return cb(null, user, { message: 'Logged in successfully' })
            })
            .catch(err => cb(err));
    }
));

export default {}