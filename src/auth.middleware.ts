import { Request, Response, NextFunction } from "express";

const API_KEY = process.env.API_KEY;

/**
 * Middleware function to authenticate requests using an API key.
 * If API_KEY is not set, the middleware will pass the request to the next handler.
 * If the API key is missing or does not match the expected API_KEY value, it will return a 401 Unauthorized response.
 * @param req - The Express request object.
 * @param res - The Express response object.
 * @param next - The next middleware function.
 */
const authenticate = (req: Request, res: Response, next: NextFunction) => {
  if (!API_KEY) {
    return next();
  }

  const apiKey = req.header("x-api-key");

  if (!apiKey || apiKey !== API_KEY) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  next();
};

export default authenticate;
