import { Request, Response } from "express";
import { CreateUserInput } from "../schema/user.schema";
import { omit } from "lodash";
import { createUser } from "../service/user.service";
import logger from "../utils/logger";

const createUserHandler = async (
  req: Request<{}, {}, CreateUserInput["body"]>,
  res: Response
) => {
  try {
    const user = await createUser(req.body);

    return res.send(omit(user.toJSON(), "password"));
  } catch (error: any) {
    // 409 means conflict
    logger.error(error);
    return res.status(409).send(error.message);
  }
};

export default createUserHandler;
