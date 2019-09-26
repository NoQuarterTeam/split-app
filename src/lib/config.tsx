export const env = process.env.NODE_ENV || "development"

export const production = env === "production"

export const apiUrl =
  env === "production"
    ? "https://api.getsplit.co/graphql"
    : "http://192.168.2.1:5000/graphql"
