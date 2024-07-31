import NextAuth from "next-auth";
import authConfig from "./auth.config";
import { NextResponse } from "next/server";
import { apiAuthPrefix, authRoutes, DEFAULT_LOGIN_REDIRECT, publicRoutes } from "./routes";



const {auth} = NextAuth(authConfig)


export default auth((req) => {
  const { nextUrl } = req; 
  const isLoggedIn = !!req.auth;

  console.log("Route:- ", req.nextUrl.pathname)
  console.log("isLoggedIn:- ", isLoggedIn)


  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);

  if(isApiAuthRoute) return null

  if(isAuthRoute){
    if(isLoggedIn){
      return NextResponse.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl))
    }
    return null
  }

  if(!isLoggedIn && !isPublicRoute){
    return NextResponse.redirect(new URL("/auth/login", nextUrl))
  }

  return null;
})

export const config = {
  matcher: [ '/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
}