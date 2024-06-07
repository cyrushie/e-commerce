import { NextRequest, NextResponse } from "next/server";
import authConfig from "./auth.config";
import NextAuth from "next-auth";
import { adminRoutes } from "./routes";
import { isValidPassword } from "./lib/isValidPassword";

const { auth } = NextAuth(authConfig);
export default auth(async function middleware(req: NextRequest) {
  const { nextUrl } = req;

  const isAdminRoute = nextUrl.pathname.startsWith(adminRoutes);

  if (isAdminRoute) {
    if ((await isAuthenticated(req)) === false) {
      return new NextResponse("Unauthorize", {
        status: 401,
        headers: {
          "WWW-Authenticate": "Basic",
        },
      });
    }
  }
});

async function isAuthenticated(req: NextRequest) {
  const authHeader =
    req.headers.get("authorization") || req.headers.get("Authorization");

  if (!authHeader) {
    return false;
  }

  const [username, password] = Buffer.from(authHeader.split(" ")[1], "base64")
    .toString()
    .split(":");

  return (
    username === process.env.ADMIN_USERNAME &&
    (await isValidPassword(
      password,
      process.env.ADMIN_HASHED_PASSWORD as string
    ))
  );
}

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
