import {} from "mongoose";
import UserModel, { UserDocument, UserInput } from "../models/user.models";

export async function createUser(input: UserInput) {
  try {
    return await UserModel.create(input);
  } catch (error: any) {
    throw new Error(error);
  }
}
