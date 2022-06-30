import { omit } from "lodash";
import { FilterQuery, QueryOptions, UpdateQuery } from "mongoose";
import config from "config";
import axios from "axios";
import qs from "qs";
require("dotenv").config();
import { SessionDocument } from "../models/session.model";
import AdminModel, { AdminDocument, AdminInput } from "../models/admin.models";
import log from "../utils/logger";

export async function createAdminUser(input: AdminInput) {
  try {
    const adminUser = await AdminModel.create(input);

    return omit(adminUser.toJSON(), "password");
  } catch (error: any) {
    throw new Error(error);
  }
}

export async function validateAdminPassword({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  const adminUser = await AdminModel.findOne({ email });

  if (!adminUser) {
    return false;
  }

  const isValid = await adminUser.comparePassword(password);

  if (!isValid) {
    return false;
  }

  return omit(adminUser.toJSON(), "password");
}

export async function findAdminUser(query: FilterQuery<AdminDocument>) {
  return AdminModel.findOne(query).lean();
}

// console.log(process.env);
interface GoogleTokensResult {
  access_token: string;
  expires_in: string;
  refresh_token: string;
  scope: string;
  id_token: string;
}
export async function getGoogleOauthTokens({
  code,
}: {
  code: string;
}): Promise<GoogleTokensResult> {
  const url = "https://oauth2.googleapis.com/token";

  const values = {
    code,
    client_id: process.env.GOOGLE_CLIENT_ID as string,
    client_secret: process.env.GOOGLE_CLIENT_SECRET as string,
    redirect_uri: process.env.OAUTH_REDIRECT_URL as string,
    grant_type: "authorization_code",
  };

  // console.log({ values });

  try {
    const res = await axios.post<GoogleTokensResult>(
      url,
      qs.stringify(values),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    return res.data;
  } catch (error: any) {
    console.log(error.response.data.error);
    log.error(error, "Failed to fetch google OAuth Tokens");
    throw new Error(error.message);
  }
}

interface GoogleUserResult {
  id: string;
  email: string;
  verified_email: string;
  name: string;
  given_name: string;
  family_name: string;
  picture: string;
  locale: string;
}

export async function getGoogleUser({
  id_token,
  access_token,
}: {
  id_token: string;
  access_token: string;
}): Promise<GoogleUserResult> {
  try {
    const res = await axios.get<GoogleUserResult>(
      `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${access_token}`,
      {
        headers: {
          Authorization: `Bearer ${id_token}`,
        },
      }
    );

    return res.data;
  } catch (error: any) {
    log.error(error, "Error fetching google user");
    throw Error(error.message);
  }
}

export async function findAndUpdateAdminUser(
  query: FilterQuery<AdminDocument>,
  update: UpdateQuery<AdminDocument>,
  options: QueryOptions = {}
) {
  return AdminModel.findOneAndUpdate(query, update, options);
}
