export const variables = () => ({
  jwtSecret: process.env.JWT_SECRET,
  mongoConnection: process.env.DATABASE_URL,
});
