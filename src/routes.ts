/**
 * An array of routes that are public
 * @type {string[]}
 */
export const publicRoutes: (string | RegExp)[] = [
  "/",
  /^\/blog\/[a-zA-Z0-9]+$/,
  /^\/user\/[a-zA-Z0-9]+$/,
];

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
