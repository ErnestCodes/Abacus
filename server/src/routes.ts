import { Express, Request, Response } from "express";
import {
  createUserSessionHandler,
  deleteSessionHandler,
  getUserSessionHandler,
} from "./controller/session.controller";
import createUserHandler from "./controller/user.controller";
import requireUser from "./middleware/requireUser";
import validateResource from "./middleware/validateResource";
import { createUserSessionSchema } from "./schema/session.schema";
import { createUserSchema } from "./schema/user.schema";

function routes(app: Express) {
  // Performance and healthcheck
  app.get("/healthcheck", (req: Request, res: Response) => {
    res.sendStatus(200);
  });

  // Create User route
  app.post("/api/users", validateResource(createUserSchema), createUserHandler);

  // Create session
  app.post(
    "/api/sessions",
    validateResource(createUserSessionSchema),
    createUserSessionHandler
  );

  // Get the sessions
  app.get("/api/sessions", requireUser, getUserSessionHandler);

  // Delete session
  app.delete("/api/sessions", requireUser, deleteSessionHandler);
}

export default routes;
