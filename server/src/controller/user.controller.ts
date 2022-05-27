import { Request, Response } from "express";
import { CreateUserInput } from "../schema/user.schema";
import { omit } from "lodash";
import { createUser } from "../service/user.service";
import log from "../utils/logger";

const createUserHandler = async (
  req: Request<{}, {}, CreateUserInput["body"]>,
  res: Response
) => {
  const mainBody = req.body;
  const pictures = req.body.pictures as string;
  const body = {
    ...mainBody,
    pictures,
  };
  try {
    const user = await createUser(body);

    return res.send(user);
  } catch (error: any) {
    // 409 means conflict
    log.error(error);
    return res.status(409).send(error.message);
  }
};

export default createUserHandler;
