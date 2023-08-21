import passport from "../../config/passport";
export const authenticate = passport.authenticate("jwt", { session: false });
