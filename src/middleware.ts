import NextAuth from "next-auth";
import authConfig from "./auth.config";
import { NextResponse } from "next/server";

const {auth} = NextAuth(authConfig)

export default auth((req) => {
  const isLoggedIn = !!req.auth;
  console.log("Route:- ", req.nextUrl.pathname)
  console.log("isLoggedIn:- ", isLoggedIn)



  // if(isLoggedIn){
  //   return NextResponse.redirect(new URL('/', req.nextUrl))
  // }
  return NextResponse.next()
})

export const config = {
  matcher: [ '/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
}