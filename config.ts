export const PORT = parseInt(process.env.PORT!) || 8000;

export const DATABASE_URL =
  process.env.DATABASE_URL ||
  `postgres://${process.env.USER}@localhost:5432/juststudy`;

export const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:3000";

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
