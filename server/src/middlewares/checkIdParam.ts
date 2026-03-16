import type { Request, Response, NextFunction } from 'express';

export const checkIdParam = (req: Request, res: Response, next: NextFunction) => {
  const id = Number(req.params.id);

  if (!Number.isInteger(id)) {
    return res.status(400).json({
      error: "L'id doit être un nombre entier valide"
    });
  }

  next();
};