export const SERVER_PORT = parseInt(process.env.PORT!) || 8000;

export const DATABASE_URL =
  process.env.DATABASE_URL || "mysql://root:root@localhost:8889/sitejuststudy";

export const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:3000";

export const NALOG_INN = process.env.NALOG_INN || 0;
export const NALOG_PASSWORD = process.env.NALOG_PASSWORD || "";

export const SESSION_MAX_AGE =
  parseInt(process.env.SESSION_MAX_AGE!) || 60 * 60 * 24 * 30;

// If the environment doesn't supply a value, default the secret to a secure random string
// This will cause all cookies to be invalidated with each app restart (annoying but better than having a hardcoded default)
// A secure value will be set in your Heroku deploy if you use the "Deploy to Heroku" button or follow the instructions in the README
export const SESSION_SECRET =
  process.env.SESSION_SECRET ||
  require("crypto")
    .randomBytes(32)
    .toString("base64")
    .replace(/[^a-zA-Z0-9]+/g, "");

export const S3_STORAGE_KEY_ID = process.env.S3_STORAGE_KEY_ID || "";
export const S3_STORAGE_KEY_SECRET = process.env.S3_STORAGE_KEY_SECRET || "";

export const MAIL_HOST = process.env.MAIL_HOST || "";
export const MAIL_PORT = process.env.MAIL_PORT || "1";
export const MAIL_USER = process.env.MAIL_USER || "ethereal.email";
export const MAIL_PASS = process.env.MAIL_PASS || "";
