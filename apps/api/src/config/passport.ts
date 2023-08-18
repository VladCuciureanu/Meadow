import passport from "passport";
import { Strategy as JWTStrategy } from "passport-jwt";
import { ExtractJwt } from "passport-jwt";
import { Strategy as LocalStrategy } from "passport-local";
import usersService from "../features/users/users.service";
import config from "./env";
import * as argon2 from "argon2";

const LocalLogin = new LocalStrategy(
  {
    usernameField: "email",
  },
  async (email, password, done) => {
    let user = await usersService.getByEmail(email);
    if (!user || (await argon2.verify(user.passwordHash, password))) {
      return done(null, false, {
        message: "Your login details could not be verified. Please try again.",
      });
    }
    delete (user as any).passwordHash;
    done(null, user);
  }
);

const JWTLogin = new JWTStrategy(
  {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: config.jwt.secret,
  },
  async (payload, done) => {
    let user = await usersService.getById(payload._id);
    if (!user) {
      return done(null, false);
    }
    delete (user as any).passwordHash;
    done(null, user);
  }
);

passport.use(LocalLogin);
passport.use(JWTLogin);

export default passport;
