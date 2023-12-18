import { withAuth, NextRequestWithAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";
export default withAuth(
  // `withAuth` augments your `Request` with the user's token.
  //  middleware function only runs when callback return true
  function middleware(request: NextRequestWithAuth) {
    const isOnDashboard = request.nextUrl.pathname.startsWith("/dashboard");
    const isLoggedIn = request.nextauth.token?.username;
    if (isOnDashboard && !isLoggedIn) {
      return NextResponse.rewrite(new URL("/login", request.url));
    }


  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
);

// middleware goes through withAuth before dashboard
export const config = { matcher: ["/dashboard/:path*","/"] };
