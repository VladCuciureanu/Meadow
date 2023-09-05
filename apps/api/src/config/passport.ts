import passport from "passport";
import { Strategy as JWTStrategy } from "passport-jwt";
import { ExtractJwt } from "passport-jwt";
import usersService from "../features/users/users.service";
import config from "./env";
import express from "express";
import { UserDto } from "@meadow/shared";

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
    let user = (await usersService.getUserById(payload.userId)) as UserDto;

    if (!user) {
      return done(null, false);
    }

    done(null, {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      imgUrl: user.imgUrl,
      teams: user.teams,
      createdAt: user.createdAt,
    } as UserDto);
  }
);

passport.use(JWTLogin);

export default passport;
