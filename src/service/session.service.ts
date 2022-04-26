import SessionModel from "../models/session.model";

export async function createSession(userId: string, userAgent: string) {
  // Here we create a session with userId and userAgent
  const session = await SessionModel.create({
    user: userId,
    userAgent,
  });

  return session.toJSON();
}
