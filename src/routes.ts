/**
 * An array of routes that are public
 * @type {string[]}
 */
export const publicRoutes: (string | RegExp)[] = [
  "/",
  /^\/blog\/[a-zA-Z0-9]+$/,
  /^\/user\/[a-zA-Z0-9]+$/,
];

export type notAllowedType = {
  [key: string]: string
}

/**
 * An array of routes that are not allowed
 * @type {string[]}
 */
export const notAllowed: notAllowedType[] = [
  {
    "/settings": "/settings/account",
  },
  {
    "/blog": "/",
  },
  {
    "/user": "/",
  }
]

/**
 * An array of routes that are protected
 * @type {string[]}
 */
export const authRoutes = [
  "/auth/login",
  "/auth/register",
  "/auth/error",
  "/auth"
]

/**
 * The prefix for the auth api
 * @type {string}
 */
export const apiAuthPrefix = "/api/auth"

export const DEFAULT_LOGIN_REDIRECT = "/"
