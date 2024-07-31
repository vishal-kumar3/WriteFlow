/**
 * An array of routes that are public
 * @type {string[]} 
 */
export const publicRoutes = [
  "/",
];

/**
 * An array of routes that are protected
 * @type {string[]}
 */
export const authRoutes = [
  "/auth/login",
  "/auth/register",
]

/**
 * The prefix for the auth api
 * @type {string}
 */
export const apiAuthPrefix = "/api/auth"

export const DEFAULT_LOGIN_REDIRECT = "/"