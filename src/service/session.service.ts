import { FilterQuery } from "mongoose";
import SessionModel, { SessionInput } from "../models/session.model";

export async function createSession(userId: string, userAgent: string) {
  // Here we create a session with userId and userAgent
  const session = await SessionModel.create({
    user: userId,
    userAgent,
  });

  return session.toJSON();
}

export async function findSessions(query: FilterQuery<SessionInput>) {
  // find session & assume every query to this model
  // requires .lean()
  return SessionModel.find(query).lean();
}
