// src/middleware/authMiddleware.ts
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export const authenticateJWT = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.header('Authorization')?.replace('Bearer ', '') || req.header('authorization')?.replace('Bearer ', '');
  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  jwt.verify(token, process.env.JWT_SECRET || 'secret', (err, user) => {
    if (!user) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    if (err) {
      return res.status(403).json({ error: 'Forbidden' });
    }
    (req as any).user = user;
    next();
  });
};
