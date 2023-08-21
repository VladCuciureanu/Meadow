import passport from "passport";
import { Strategy as JWTStrategy } from "passport-jwt";
import { ExtractJwt } from "passport-jwt";
import usersService from "../features/users/users.service";
import config from "./env";
import express from "express";

export const JWTCookieName = "jwt";

function cookieExtractor(req: express.Request) {
  var token = null;
  if (req && req.cookies) {
    token = req.signedCookies[JWTCookieName];
  }
  return token;
}

const JWTLogin = new JWTStrategy(
  {
    jwtFromRequest: ExtractJwt.fromExtractors([
      cookieExtractor,
      ExtractJwt.fromAuthHeaderAsBearerToken(),
    ]),
    secretOrKey: config.jwt.secret,
  },
  async (payload, done) => {
    let user = await usersService.getById(payload.userId);

    if (!user) {
      return done(null, false);
    }

    delete (user as any).passwordHash;

    done(null, user);
  }
);

passport.use(JWTLogin);

export default passport;
