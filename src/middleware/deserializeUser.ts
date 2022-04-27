import { NextFunction, Request, Response } from "express";
import { get } from "lodash";
import { verifyJwt } from "../utils/jwt.utils";

const deserializeUser = (req: Request, res: Response, next: NextFunction) => {
  const accessToken = get(req, "headers.authorization", "").replace(
    /^Bearer\s/,
    ""
  );

  // check for accesstoen
  if (!accessToken) {
    return next();
  }

  const { expired, decoded } = verifyJwt(accessToken);

  if (decoded) {
    res.locals.user = decoded;
    return next();
  }

  return next();
};

export default deserializeUser;
