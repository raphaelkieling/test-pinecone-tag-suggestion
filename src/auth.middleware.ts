import { Request, Response, NextFunction } from "express";

const API_KEY = process.env.API_KEY;

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
