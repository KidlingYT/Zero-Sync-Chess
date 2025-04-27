import { Hono } from "hono";
import { setCookie } from "hono/cookie";
import { handle } from "hono/vercel";
import { SignJWT } from "jose";

export const config = {
  runtime: "edge",
};

export const app = new Hono().basePath("/api");

// TODO: This is temporary, eventually let's do this from the database...
// TODO: Add the create account endpoint
const userIDs = ["7VoEoJWEwn"];

app.get("/login", async (c) => {
  const jwtPayload = {
    sub: userIDs[0],
    iat: Math.floor(Date.now() / 1000),
  };

  const jwt = await new SignJWT(jwtPayload)
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("30days")
    .sign(new TextEncoder().encode(must(process.env.ZERO_AUTH_SECRET)));

  setCookie(c, "jwt", jwt, {
    expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
  });

  return c.text("ok");
});

export default handle(app);

function must<T>(val: T) {
  if (!val) {
    throw new Error("Expected value to be defined");
  }
  return val;
}
